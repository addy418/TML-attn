'use strict';
var request = require('request');
var dao = require('../dao/GeofenceDao');
var logger = require('../../common/logger').log;

module.exports.getGeofenceList = function getGeofenceList(req, res, next) {
	logger.info('Geofence : controller : getGeofenceList : received req');
    res.setHeader('Content-Type', 'application/json');
    dao.getGeofenceList(req, function(err, data) {
    	if (err) {
    		logger.error('Geofence : controller : getGeofenceList : err : '+JSON.stringify(err));
    		res.statusCode = 503;
            res.end(JSON.stringify({
                error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('Geofence : controller : getGeofenceList : success');
        	res.statusCode = 200;
            res.end(JSON.stringify(data));
        }
    });
};

module.exports.handleOption = function handleOption(req, res, next) {    
    res.setHeader('Content-Type', 'application/json');
    res.end();
};