'use strict';
var request = require('request');
var dao = require('../dao/attendanceDao');
var logger = require('../../common/logger').log; 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';




module.exports.putUserAttendance = function putUserAttendance(req, res, next) {
	logger.info('attendance : controller : putUserAttendance : received req');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    dao.putUserAttendance(req, function(err, data) {
    	if (err) {      
    		logger.info('attendance : controller : putUserAttendance : err : '+JSON.stringify(err));
    		res.statusCode = 503;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('attendance : controller : putUserAttendance : success');
        	res.statusCode = 200;
            res.end(JSON.stringify(data));
        }
    });
};

module.exports.handleOption = function handleOption(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.end();
};
