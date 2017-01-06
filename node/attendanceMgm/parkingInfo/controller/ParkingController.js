'use strict';
var parkingDao = require('../dao/ParkingDao');
var logger = require('../../common/logger').log;

module.exports.getParkingSlotCount = function getParkingSlotCount(req, res, callback) {	
	logger.info('parking : controller : getParkingSlotCount : received req');
    res.setHeader('Content-Type', 'application/json');	
    parkingDao.getParkingSlotCount(req, function(err, data) {
    	if (err) { 
    		logger.info('parking : controller : getParkingSlotCount : err : '+JSON.stringify(err));
    		res.statusCode = 500;
            res.end(JSON.stringify({
            	error: err.message,
                err: err.code
            }));
        } else {
        	logger.info('parking : controller : getParkingSlotCount : success ');
			  res.statusCode = 200;
			  var allocatedSlots= data.json;
			  var availableSlots= 1000- allocatedSlots;
			  console.log(availableSlots);
			  data.availableSlotCount= availableSlots;
            res.end(JSON.stringify(data));   	
        }
    });
}; 

module.exports.handleOption = function handleOption(req, res, next) {    
    res.setHeader('Content-Type', 'application/json');
    res.end();
};