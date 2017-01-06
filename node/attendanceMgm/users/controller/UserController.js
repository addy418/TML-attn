'use strict';
var userDao = require('../dao/UserDao');
var async = require("async");
var logger = require('../../common/logger').log;
var request = require('request');
var attendanceDao = require('../../attendance/dao/attendanceDao');
	
/*  request = request.defaults({
    'proxy': 'http://sonali_somase:Project2vega@hjproxy.persistent.co.in:8080'
}); */
 
module.exports.addUser = function addUser(req, res, callback) {
logger.info('users : controller : addUser : received req');
  res.setHeader('Content-Type', 'application/json');
  async.waterfall([
    async.apply(addNewuser, req),
    login,
    saveToken,
    doCheckIn
  ], function(err, data) {
    if (err) {
	logger.info('users : controller : addUser : err : '+JSON.stringify(err));
    	res.statusCode = 500;
        res.end(JSON.stringify({
        	error: err.message,
            err: err.code
        }));
    }
    else{
	logger.info('users : controller : addUser : success ');
    res.statusCode = 200;
	var response={
		"full_name": req.body.full_name,
		"user_id": req.body.user_id,
		"mobileno": req.body.mobileno,
		"created_by": req.body.user_id,
		"updated_by": req.body.user_id,
		"mwm_token": req.body.access_token
	}
    res.end(JSON.stringify(response));
	}
  });
};

/*
 ** save user details
 */
var addNewuser = function(req, cb) {
logger.info('users : controller : addNewuser : received req');
  userDao.addUser(req, function(err, data) {
    if (err){
	logger.info('users : controller : addNewuser : err : '+JSON.stringify(err));
      cb(err);
	  }
    else{
		logger.info('users : controller : addNewuser : success ');
      cb(null, req);
	}
  })
}

var login=function(req,callback){
	logger.info('users : controller : Login : received req');
	var auth="T_"+req.body.user_id+"@tata:tatamotors1";
				var buffer = new Buffer(auth);
var toBase64 = buffer.toString('base64');

                    request({ 						
                        url: 'http://52.77.230.9:8008/mwm/auth/fieldstaffs/login?grant_type=password&client_id=tata',
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Basic "+toBase64,
                            "appkey": 'test2345',
							"utcTimestamp":new Date().getTime(),
                            "utcTimestampSignature": new Date().getTime()
                        },
                        json: {
                "imei": "tetert345345345",
                "macId": "43:45:df:45:fg",
                "gcmId": "sdgsdgsdgsdg",
                "deviceName": "device name"
}
                    }, function(error, response, authResBody) {
                        if (error) {
                        	logger.info('users : controller : Login : err : '+JSON.stringify(error));
                            callback(error);                            
                        } else {
                        	logger.info('users : controller : Login : success ');						
						var access_token=authResBody.access_token;						
                            req.body.access_token=access_token;
							callback(null,req);
                        }
                    });
}


/*
 ** save token details
 */
var saveToken = function(req, cb) {
logger.info('users : controller : saveToken : received req');
  userDao.saveToken(req, function(err, data) {
    if (err){
	logger.info('users : controller : saveToken : err : '+JSON.stringify(err));
      cb(err);
	  }
    else {
	logger.info('users : controller : saveToken : success ');
      cb(null, req);
    }
  })
}

/*
 ** check-in
 */
var doCheckIn =function doCheckIn(req,callback) {
	
	logger.info('users : controller : doCheckIn : received req');
    
	var user_id="T_"+req.body.user_id;
    request({ 		
        url: 'http://52.77.230.9:8008/mwm/fieldstaffs/'+user_id+'/checkin',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  'bearer '+req.body.access_token,
			"utcTimestamp": new Date().getTime(),
            "utcTimestampSignature": new Date().getTime()
        },
        json: {
                "imei": "tetert345345345",
                "macId": "43:45:df:45:fg",
                "gcmId": "sdgsdgsdgsdg",
                "deviceName": "device name"
}
    }, function(error, response, body) {
        if (error) {			
        	logger.info('users : controller : doCheckIn : err : '+JSON.stringify(error));
			callback(error);
        } else {
        	logger.info('users : controller : doCheckIn : success ');
            callback(null,req);
        }
    });
};

/*
** Get alert details by user_id
*/
module.exports.getAlertDetails = function getAlertDetails(req, res, callback) {	
	logger.info('users : controller : getAlertDetails : received req');
    res.setHeader('Content-Type', 'application/json');	
    userDao.getAlertDetails(req, function(err, data) {
    	if (err) { 
    		logger.info('users : controller : getAlertDetails : err : '+JSON.stringify(err));
    		res.statusCode = 500;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('users : controller : getAlertDetails : success ');
			res.statusCode = 200;			  
            res.end(JSON.stringify(data));   	
        }
    });
};

/*
** update alert status by user_id
*/
module.exports.updateAlertStatus = function updateAlertStatus(req, res, callback) {	
	logger.info('users : controller : updateAlertStatus : received req');
    res.setHeader('Content-Type', 'application/json');	
    userDao.updateAlertStatus(req, function(err, data) {
    	if (err) { 
    		logger.info('users : controller : updateAlertStatus : err : '+JSON.stringify(err));
    		res.statusCode = 500;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('users : controller : updateAlertStatus : success ');
			res.statusCode = 200;			  
            res.end(JSON.stringify(data));   	
        }
    });
};


module.exports.getUserAttendance = function getUserAttendance(req, res, next) {
	logger.info('attendance : controller : getUserAttendance : received req');
    attendanceDao.getUserAttendance(req, function(err, data) {
    	if (err) { 
    		logger.info('attendance : controller : getUserAttendance : err : '+JSON.stringify(err));
    		res.statusCode = 500;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('attendance : controller : getUserAttendance : success ');
			res.statusCode = 200;			  
            res.end(JSON.stringify(data));   	
        }
    });

};

module.exports.handleOption = function handleOption(req, res, next) {    
    res.setHeader('Content-Type', 'application/json');
    res.end();
};