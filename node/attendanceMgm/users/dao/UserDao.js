'use strict';
var User= require('../models/User').User;
var logger = require('../../common/logger').log; 

module.exports.addUser = function addUser(req, callback) {
	logger.info('users : DAO : addUser : received req');
	User.create({
		full_name: req.body.full_name,
		using_car: req.body.using_car,
		user_id: "T_"+req.body.user_id,
		primary_phone_no: req.body.mobileno,
		status: "ACTIVE",
		mwm_token: null,
		login_status:'Y',		
		created_by:req.body.full_name,		
		updated_by:req.body.full_name
	})
	.then(function (users) {
		//console.log('result:'+JSON.stringify(users));
		logger.info('users : controller : getUserAttendance : success ');
		var res = {
            result: 'success',
            json: users,
            length: users.length
        };
    	callback(null, res);
	}, function (err) {
		logger.info('users : Dao : addUser : err : '+JSON.stringify(err));
		//console.log('err:'+JSON.stringify(err));		
    	callback(err);
	});
};

/*
** Save token details
*/
module.exports.saveToken= function(req,callback){
	logger.info('users : DAO : saveToken : received req');
	
	var user_id= "T_"+req.body.user_id;
	User.update({ 
	'mwm_token': req.body.access_token 
	}, 
      { where: { user_id :user_id }}
).then(function (updateDoc) {
		//console.log('result:'+JSON.stringify(updateDoc));
	logger.info('users : Dao : Login : success ');
		var res = {
            result: 'success',
            json: updateDoc,
            length: updateDoc.length
        };
    	callback(null, res);
	}, function (err) {
		logger.info('users : Dao : saveToken : err : '+JSON.stringify(err));		
    	callback(err);
	});	
}

/*
** update alert details for specific users
*/
module.exports.updateAlertDetails= function(req,callback){
	logger.info('users : DAO : updateAlertDetails : received req');	
	var user_id= req.body.user_id;
	User.update({ 
	'alert_location': req.body.alert_zone,
	'alert_text': req.body.alerts_text,
	'alert_status':"NOT_SAFE",
	'alert_id': req.body.alert_id
	}, 
      { where: { user_id :user_id }}
).then(function (updateDoc) {		
	logger.info('users : Dao : updateAlertDetails : success ');
		var res = {
            result: 'success',
            json: updateDoc,
            length: updateDoc.length
        };
    	callback(null, res);
	}, function (err) {
		logger.info('users : Dao : updateAlertDetails : err : '+JSON.stringify(err));		
    	callback(err);
	});	
}

module.exports.putUser = function putUser(req, callback) {	
	logger.info('users : dao : putUser : received req : ');	
	var reqBodyKeys = Object.keys(req.body);
	if(reqBodyKeys.length > 0) {
		var updatableFields = [ "status","alert_location","alert_text","alert_status","alert_id"];	
		var json = {};
		for(var i = 0; i < reqBodyKeys.length; i++) {
			if(updatableFields.indexOf(reqBodyKeys[i]) > -1) {
				json[reqBodyKeys[i]] = req.body[reqBodyKeys[i]];			
			}
		}
		json.updated_by = req.body.updated_by;	
		User.update(json, { where : { user_id : req.swagger.params.id.value }}).then(function(updateDoc) {			
			logger.info('users : Dao : putUser : success ');
			User.findOne({ where: { user_id : req.swagger.params.id.value } }).then(function(users) {
					if(users!= null){
				var res = {
					result : 'success',
					json : users.dataValues,
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
			logger.info('users : Dao : putUser : err : ' + JSON.stringify(err));
			callback(err);
		});
	} else {
		var res = {
			message: 'No fields updated'
		};
		callback(null, res);
	}
};

/*
** get alert details by user_id
*/
module.exports.getAlertDetails = function getAlertDetails(req,callback) {
	logger.info('users : Dao : getAlertDetails : received req');
	var user_id= "T_"+req.swagger.params.user_id.value;
User.findAll({ where: { user_id :user_id,
                     alert_status: "NOT_SAFE" }}
).then(function (AlertData) {
	logger.info('users : Dao : getAlertDetails : success ');
		var res = {
            result: 'success',
            json: AlertData            
        };
    	callback(null, res);
	}, function (err) {		
		logger.info('users : Dao : getAlertDetails : err : '+JSON.stringify(err));		
    	callback(err);
	});	  
};

/*
** update alert details for specific users
*/
module.exports.updateAlertStatus= function(req,callback){
	logger.info('users : DAO : updateAlertStatus : received req');
		var user_id= "T_"+req.swagger.params.user_id.value;
	User.update({ 	
	'alert_status':req.body.status
	}, 
      { where: { user_id :user_id }}
).then(function (updateDoc) {		
	logger.info('users : Dao : updateAlertStatus : success ');
		var res = {
            result: 'success',
            json: updateDoc,
            length: updateDoc.length
        };
    	callback(null, res);
	}, function (err) {
		logger.info('users : Dao : updateAlertStatus : err : '+JSON.stringify(err));		
    	callback(err);
	});	
}

/*
** get alert details by user_id
*/
module.exports.getUserById = function getUserById(id, callback) {
	logger.info('users : Dao : getUserById : received req');	
	User.findOne({ where: { user_id: id } }
	).then(function (user) {
		logger.info('users : Dao : getUserById : success ');		
		if(user) {
			callback(null, user);
		} else {
			var err = new Error('user id not exist');
			callback(err);
		}
	}, function (err) {		
		logger.info('users : Dao : getUserById : err : '+JSON.stringify(err));		
    	callback(err);
	});	  
};



