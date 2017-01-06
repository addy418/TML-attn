'use strict';

var SOS = require('../models/sos').SOS;
var logger = require('../../common/logger').log;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports.getSOS = function getSOS(req, callback) {
	logger.info('sos : dao : getSOS : received req : ');
	SOS.findAll().then(function(sos) {
		logger.info('sos : dao : getSOS : success : ');
		var res = {
			result : 'success',
			json : sos,
			length : sos.length
		};
		callback(null, res);
	}, function(err) {
		logger.info('sos : dao : getSOS : err : ' + JSON.stringify(err));
		callback(err);
	});

};

module.exports.postSOS = function postSOS(req, callback) {
	logger.info('sos : dao : postSOS : received req : ');
	var body = req.body;
	SOS.create({
		sos_id : body.sos_id,
		sos_timestamp : body.sos_timestamp,
		sos_by : body.sos_by,
		sos_text : body.sos_text,
		respondant_user_id : body.respondant_user_id,
		respondant_name : body.respondant_name,
		status : body.status,
		created_by : body.created_by,
		updated_by : body.updated_by
	}).then(function(sos) {
		logger.info('sos : dao : postSOS : success : ');
		var res = {
			result : 'success',
			json : sos,
			length : 1
		};
		callback(null, res);
	}, function(err) {
		logger.info('sos : dao : postSOS : err : ' + JSON.stringify(err));
		callback(err);
	});
};

module.exports.putSOS = function putSOS(req, callback) {	
	logger.info('sos : dao : putSOS : received req : ');	
	var reqBodyKeys = Object.keys(req.body);
	if(reqBodyKeys.length > 0) {
		var updatableFields = [ "respondant_user_id", "respondant_text", "respondant_name", "status" ];	
		var json = {};
		for(var i = 0; i < reqBodyKeys.length; i++) {
			if(updatableFields.indexOf(reqBodyKeys[i]) > -1) {
				json[reqBodyKeys[i]] = req.body[reqBodyKeys[i]];			
			}
		}
		json.updated_by = req.body.updated_by;	
		SOS.update(json, { where : { sos_id : req.swagger.params.id.value }}).then(function(updateDoc) {
			//console.log('result:'+JSON.stringify(updateDoc));
			logger.info('sos : Dao : putSOS : success ');
			SOS.findOne({ where: { sos_id : req.swagger.params.id.value } }).then(function(sos) {
				var res = {
					result : 'success',
					json : sos.dataValues,
					length : updateDoc.length
				};
				callback(null, res);
			});			
		}, function(err) {
			logger.info('sos : Dao : putSOS : err : ' + JSON.stringify(err));
			callback(err);
		});
	} else {
		var res = {
			message: 'No fields updated'
		};
		callback(null, res);
	}
};
