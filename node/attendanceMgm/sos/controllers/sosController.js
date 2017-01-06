'use strict';
var request = require('request');
var dao = require('../dao/sosDao');
var async = require('async');
var logger = require('../../common/logger').log; 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports.getSOS = function getSOS(req, res, next) {
    logger.info('sos : controller : getSOS : received req');
    res.setHeader('Content-Type', 'application/json');
    dao.getSOS(req, function(err, data) {
        if (err) {
            logger.info('sos : controller : getSOS : err : ' +
                JSON.stringify(err));
            res.statusCode = 503;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
            logger.info('sos : controller : getSOS : success : ');
            res.statusCode = 200;
            res.end(JSON.stringify(data));
        }
    });
};

module.exports.postSOS = function postSOS(req, res, next) {
    logger.info('sos : controller : postSOS : received req');
    var access_token;
    async
    .series(
        [
            function(callback) {
                logger
                    .info('sos : controller : mwm login : received req');
                request({
                        url: 'http://52.77.230.9:8008/mwm/auth/officestaffs/login?client_id=tata&grant_type=password',
                        method: 'GET',
                        headers: {
                            'Authorization': 'Basic YWRtaW5AdGF0YTphZG1pbjE='
                        }
                    },
                    function(error, response, loginResBody) {
                        if (error) {
                            logger
                                .info('sos : controller : mwm login : err : ' +
                                    JSON
                                    .stringify(err));
                            callback(error);
                        } else {
                            logger
                                .info('sos : controller : mwm login : success : ');
                            loginResBody = JSON
                                .parse(loginResBody);
                            access_token = loginResBody.access_token;
                            callback(null, res);
                        }
                    });
            },
            function(callback) {
                logger
                    .info('sos : controller : mwm events : received req : ');
                request({
                        url: 'http://52.77.230.9:8008/mwm/events',
                        method: 'POST',
                        headers: {
                            'Authorization': 'bearer ' +
                                access_token,
                            'Content-Type': 'application/json'
                        },
                        json: {
                            "eventID": 1003,
                            "eventName": "sosevent",
                            "eventCategory": "custom",
                            "data": {
                                "personInEmergency": req.body.sos_by
                            }
                        }
                    },
                    function(error, response, eventsResBody) {
                        if (error) {
                            logger
                                .info('sos : controller : mwm events : err : ' +
                                    JSON
                                    .stringify(err));
                            callback(error);
                        } else {
                            logger
                                .info('sos : controller : mwm login : success : ');
                            callback(null, res);
                        }
                    });
            }
        ],
        function(err, results) {
        	res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            dao.postSOS(req, function(err, data) {
                if (err) {
                	logger.info('sos : controller :postSOS : err : '+JSON.stringify(err));
                    res.statusCode = 503;
                    res.end(JSON.stringify({
                    	error: err.message,
                        err: err.code
                    }));
                } else {
                	logger.info('sos : controller :postSOS : success : ');
                    res.statusCode = 200;
                    res.end(JSON.stringify(data));
                }
            });
        });
}

module.exports.putSOS = function putSOS(req, res, next) {
    logger.info('sos : controller : putSOS : received req');
    dao.putSOS(req, function(err, data) {
        if (err) {
        	logger.info('sos : controller :putSOS : err : '+JSON.stringify(err));
            res.statusCode = 503;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('sos : controller :putSOS : success : ');
            res.statusCode = 200;
            res.end(JSON.stringify(data));
        }
    });
}

module.exports.handleOption = function handleOption(req, res, next) {    
    res.setHeader('Content-Type', 'application/json');
    res.end();
};











