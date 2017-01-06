'use strict';

var request = require('request');
var User= require('../../users/models/User').User;
var logger = require('../../common/logger').log;

module.exports.getParkingSlotCount = function getParkingSlotCount(req,callback) {
	logger.info('parking : Dao : getParkingSlotCount : received req');
User.count({ where: { using_car :1 }}
).then(function (carData) {
//		console.log('result:'+JSON.stringify(carData));
	logger.info('parking : Dao : getParkingSlotCount : success ');
		var res = {
            result: 'success',
            json: carData,
            length: carData.length
        };
    	callback(null, res);
	}, function (err) {		
		logger.info('parking : Dao : getParkingSlotCount : err : '+JSON.stringify(err));		
    	callback(err);
	});	  
};