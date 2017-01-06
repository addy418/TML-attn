'use strict';
var request = require('request');
var alertDao = require('../dao/AlertDao');
var userDao = require('../../users/dao/UserDao');
var logger = require('../../common/logger').log;
var async = require("async");

/*  request = request.defaults({
  'proxy': 'http://sonali_somase:Project2vega@hjproxy.persistent.co.in:8080'
}); */ 

module.exports.sendAlert = function sendAlert(req, res, next) {
  logger.info('Alert : controller : sendAlert : received req');
  res.setHeader('Content-Type', 'application/json');

  async.waterfall([
    async.apply(addAlert, req),
    getToken,
    getUsersByZone,
    updateAlertDetails
  ], function(err, data) {
    if (err) {
    	res.statusCode = 500;
        res.end(JSON.stringify({
        	error: err.message,
            err: err.code
        }));
    } else {      
	res.statusCode = 200;
	  var response = {
        result: 'success' ,
        json: 'Alert Sent'		
      };	  
      res.end(JSON.stringify(response));
    }
  });
};

/*
 ** save alert details
 */
var addAlert = function(req, cb) {
  alertDao.addAlert(req, function(err, data) {
    if (err)
      cb(err);
    else {
      cb(null, req);
    }
  })
}

/*
 ** get Auth token
 */
var getToken = function(req, cb) {
  logger.info('Alert : Controller : getToken : received req');

  request({
    url: 'http://52.77.230.9:8008/mwm/auth/officestaffs/login?client_id=tata&grant_type=password',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Basic YWRtaW5AdGF0YTphZG1pbjE=",
    },
  }, function(error, response, authResBody) {
    if (error) {
      logger.info('Alert : Controller : getToken : err : ' + JSON.stringify(error));
      cb(error);
    } else {
      logger.info('users : Controller : getToken : success ');
      var loginResBody = JSON
        .parse(authResBody);
      req.body.access_token = loginResBody.access_token;
      cb(null, req);
    }
  });
}

/*
 ** get Users by geofence zone
 */
var getUsersByZone = function(req, cb) {
  logger.info('Alert : Controller : getUsersByZone : received req');

  var zone = req.body.alert_zone;

  request({
    url: 'http://52.77.230.9:8008/mwm/geofences/' + zone + '/fieldstaffs',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "bearer  " + req.body.access_token
    },
  }, function(error, response, userData) {
    if (error) {
      logger.info('Alert : Controller : getUsersByZone : err : ' + JSON.stringify(error));
      cb(error);
    } else {		
      logger.info('Alert : Controller : getUsersByZone : success ');
	  console.log(userData);
      var userResponse = JSON.parse(userData);
      req.body.data = userResponse.data;
      cb(null, req);
    }
  });
}

var updateAlertDetails = function(req, cb) {
  logger.info('Alert : Controller : updateAlertDetails : received req');  
  var userArray = req.body.data;

  async.each(userArray, function(users, callback) {
      req.body.user_id = users.userid;
	 var updateReq={}
	  updateReq.body= {};
	  updateReq.swagger={};
	  updateReq.swagger.params={};
	  updateReq.swagger.params.id={};
	  updateReq.swagger.params.id.value={};
	 updateReq.body.alert_zone= req.body.alert_zone;
	updateReq.body.alerts_text= req.body.alerts_text;
	updateReq.body.alert_status ="NOT_SAFE";
	updateReq.body.alert_id= req.body.alert_id;
	updateReq.swagger.params.id.value= users.userid;
      userDao.putUser(updateReq, function(err, data) {
        if (err)
          cb(err);
        else {
          cb();
        }
      })
    },
    function(err) {
      if (err) {
        logger.info('Alert : Controller : updateAlertDetails : err : ' + JSON.stringify(error));
        cb(err);
      } else {
        logger.info('Alert : Controller : updateAlertDetails : success ');
        cb(null, req);
      }
    }
  );
}

/*
** Get alert details
*/
module.exports.getAlerts = function getAlerts(req, res, next) {
    logger.info('Alert : controller : getAlerts : received req');
    res.setHeader('Content-Type', 'application/json');
    alertDao.getAlerts(req, function(err, data) {
        if (err) {
            logger.info('Alert : controller : getAlerts : err : ' +
                JSON.stringify(err));
            res.statusCode = 500;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
            logger.info('Alert : controller : getAlerts : success : ');
            res.statusCode = 200;
            res.end(JSON.stringify(data));
        }
    });
};

/*
** update alert status
*/
module.exports.putAlert = function putAlert(req, res, next) {
    logger.info('Alert : controller : putAlert : received req');
    alertDao.putAlert(req, function(err, data) {
        if (err) {
        	logger.info('Alert : controller :putAlert : err : '+JSON.stringify(err));
            res.statusCode = 503;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('Alert : controller :putAlert : success : ');
			res.statusCode = 200;
            res.end(JSON.stringify(data));			         
        }
    });
}

module.exports.handleOption = function handleOption(req, res, next) {    
    res.setHeader('Content-Type', 'application/json');
    res.end();
};