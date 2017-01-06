'use strict';
var Location = require('../models/Location').Location;
var request = require('request');
var logger = require('../../common/logger').log;
/*request = request.defaults({
    'proxy': 'http://sonali_somase:Project2vega@hjproxy.persistent.co.in:8080'
});*/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


module.exports.getLocation = function getLocation(req, callback) {
	logger.info('locations : dao : getLocation : received req');
	Location.findAll()
	.then(function (locs) {
		logger.info('locations : dao : getLocation : success');
		var res = {
            result: 'success',
            json: locs,
            length: locs.length
        };
    	callback(null, res);
	}, function (err) {
		logger.error('locations : dao : getLocation : err : '+JSON.stringify(err));
    	callback(err);
	});
};


module.exports.addLocation = function putLocation(req, callback) {
	logger.info('locations : dao : addLocation : received req');
    var body = req.body;
    Location.create({
    	user_id: body.user_id,
    	capture_date: body.capture_date,
    	latitude: body.latitude,
    	longitude: body.longitude,
    	status: body.status,
    	created_by: body.created_by
    }).then(function (loc) {
    	logger.info('locations : dao : addLocation : success');
        var res = {
            result: 'success',
            json: loc,
            length: 1
        };
    	callback(null, res);        
	}, function (err) {
		logger.error('locations : dao : addLocation : err : '+JSON.stringify(err));
    	callback(err);
	});
};
