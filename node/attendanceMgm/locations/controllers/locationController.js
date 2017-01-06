'use strict';
var request = require('request');
var dao = require('../dao/locationDao');
var logger = require('../../common/logger').log;
var userDao = require('../../users/dao/UserDao');
	
/*request = request.defaults({
    'proxy': 'http://sonali_somase:Project2vega@hjproxy.persistent.co.in:8080'
});*/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


module.exports.getLocation = function getLocation(req, res, next) {
	logger.info('locations : controller : getLocation : received req');
    res.setHeader('Content-Type', 'application/json');
    dao.getLocation(req, function(err, data) {
    	if (err) {
    		logger.error('locations : controller : getLocation : err : '+JSON.stringify(err));
    		res.statusCode = 503;
            res.end(JSON.stringify({
                error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('locations : controller : getLocation : success');
        	res.statusCode = 200;
            res.end(JSON.stringify(data));
        }
    });
};


module.exports.addLocation = function putLocation(req, res, next) {
	logger.info('locations : controller : addLocation : received req');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    var body = req.body;
    userDao.getUserById(body.user_id, function(err, user) {
		if (err) {  
			logger.error('locations : controller : addLocation : err : '+err);
			res.statusCode = 503;
	        res.end(JSON.stringify({
	            error: err.message,
	            err: err.code
	        }));
	    } else {
		    dao.addLocation(req, function(err, data) {
		    	if (err) {  
		    		logger.error('locations : controller : addLocation : err : '+err);
		    		res.statusCode = 503;
		            res.end(JSON.stringify({
		                error: err.message,
		                err: err.code
		            }));
		        } else {
		        	logger.info('locations : controller : addLocation : success');	        	
	            	request({
	                    //'proxy':'https://hjproxy.persistent.co.in:8080' ,
	                    url: 'https://52.77.230.9:8085/cdp/location/v1/fieldstaffs/'+body.user_id+'/devices/location',
	                    method: 'PUT',
	                    headers: {
	                        'Content-Type': 'application/json',
	                        'Authorization': 'bearer ' + user.mwm_token,
	                        "utcTimestamp": '1475561568',
	                        "utcTimestampSignature": '9c5806d39eff192cb85c2fb322f03e4aff8adc97d286988648f3b2af03413ecb'
	                    },
	                    json: {
	                        "latitude": body.latitude,
	                        "longitude": body.longitude,
	                        "accuracy": "50",
	                        "locationType": 0
	                    }
	                }, function(error, response, mwmResBody) {
	                	logger.info('locations : controller : addLocation MWM : mwm loc res body : '+JSON.stringify(mwmResBody));
	                    if (error) {
	                    	logger.error('locations : controller : addLocation MWM : err : '+error);
	                    	res.statusCode = 500;
	                        res.end(JSON.stringify({
	                            error: error.message,
	                            err: error.code
	                        }));
	                    } else {
	                    	logger.info('locations : controller : addLocation MWM : success');
	                    	res.statusCode = 200;
	                        res.end(JSON.stringify(data));
	                    }
	                });	                       	        	
		        }
		    });
	    }
	}); 
};




module.exports.handleOption = function handleOption(req, res, next) {    
    res.setHeader('Content-Type', 'application/json');
    res.end();
};