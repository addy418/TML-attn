'use strict';
var logger = require('../../common/logger').log;
var request = require('request');
var Alert = require('../models/Alert').Alert;

/*
 ** Send Alert
 */
module.exports.addAlert = function(req, callback) {
  logger.info('Alert : DAO : addAlert : received req');
  Alert.create({
      alerts_text: req.body.alerts_text,
      alert_zone: req.body.alert_zone,
      created_by: req.body.created_by,
      updated_by: req.body.created_by
    })
    .then(function(alerts) {
      logger.info('Alert : Dao : addAlert : success ');
      var res = {
        result: 'success',
        json: alerts,
        length: alerts.length
      };	  
	  req.body.alert_id= alerts.dataValues.alert_id;
      callback(null, res);
    }, function(err) {
      logger.info('Alert : Dao : addAlert : err : ' + JSON.stringify(err));
      callback(err);
    });
};

/*
** Get all alerts
*/
module.exports.getAlerts = function getAlerts(req, callback) {
	logger.info('Alert : dao : getAlerts : received req : ');
	if(req.swagger.params.status.value== null || req.swagger.params.status.value== undefined){
		console.log('undefined');
		req.swagger.params.status.value= 'ACTIVE';
	}
	
	Alert.findAll({where:{status:req.swagger.params.status.value}}).then(function(alerts) {
		logger.info('Alert : dao : getAlerts : success : ');
		var res = {
			result : 'success',
			json : alerts,
			length : alerts.length
		};
		callback(null, res);
	}, function(err) {
		logger.info('Alert : dao : getAlerts : err : ' + JSON.stringify(err));
		callback(err);
	});

};


module.exports.putAlert = function putAlert(req, callback) {	
	logger.info('Alert : dao : putAlert : received req : ');	
	var reqBodyKeys = Object.keys(req.body);
	if(reqBodyKeys.length > 0) {
		var updatableFields = [ "status"];	
		var json = {};
		for(var i = 0; i < reqBodyKeys.length; i++) {
			if(updatableFields.indexOf(reqBodyKeys[i]) > -1) {
				json[reqBodyKeys[i]] = req.body[reqBodyKeys[i]];			
			}
		}
		json.updated_by = req.body.updated_by;	
		Alert.update(json, { where : { alert_id : req.swagger.params.id.value }}).then(function(updateDoc) {			
			logger.info('Alert : Dao : putAlert : success ');
			Alert.findOne({ where: { alert_id : req.swagger.params.id.value } }).then(function(alert) {
					if(alert!= null){
				var res = {
					result : 'success',
					json : alert.dataValues,
					length : updateDoc.length
				};
					}
					else{
						var res = {
					result : 'success',
					json : []					
				};
					}
				callback(null, res);
			});			
		}, function(err) {
			logger.info('Alert : Dao : putAlert : err : ' + JSON.stringify(err));
			callback(err);
		});
	} else {
		var res = {
			message: 'No fields updated'
		};
		callback(null, res);
	}
};
