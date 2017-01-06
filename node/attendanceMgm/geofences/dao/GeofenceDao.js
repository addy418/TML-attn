'use strict';
var Geofence = require('../models/Geofences').Geofence;
var request = require('request');
var logger = require('../../common/logger').log;

module.exports.getGeofenceList = function getGeofenceList(req, callback) {
	logger.info('geofence : dao : getGeofenceList : received req');
	Geofence.findAll({ where: { status :"ACTIVE"}}
)
	.then(function (geofences) {
		logger.info('geofence : dao : getGeofenceList : success');
		var res = {
            result: 'success',
            json: geofences,            
        };
    	callback(null, res);
	}, function (err) {
		logger.error('geofence : dao : getGeofenceList : err : '+JSON.stringify(err));
    	callback(err);
	});
};
