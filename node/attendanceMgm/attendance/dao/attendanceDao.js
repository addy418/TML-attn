'use strict';
var Attendance = require('../models/Attendance').Attendance;
var logger = require('../../common/logger').log; 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports.getUserAttendance = function getUserAttendance(req, callback) {
	logger.info('attendance : dao : getUserAttendance : received req');
    Attendance.findAll({
	  where: {
		user_id: req.swagger.params.id.value,
		date:{
		$between:[req.swagger.params.startdate.value,req.swagger.params.enddate.value]
		}
	  }
	})
	.then(function (attendance) {
		logger.info('attendance : dao : getUserAttendance : success');
		var res = {
            result: 'success',
            json: attendance,
            length: attendance.length
        };
    	callback(null, res);
	}, function (err) {
		logger.info('attendance : dao : getUserAttendance : err : '+JSON.stringify(err));		
    	callback(err);
	});

};


module.exports.putUserAttendance = function putUserAttendance(req, callback) {    
	logger.info('attendance : dao : putUserAttendance : received req');
   var body = req.body;
    Attendance.create({
    	attendance_id: body.attendance_id,
    	date: body.date,
    	parking_slot: body.parking_slot,
    	bin_c: body.bin_c,
    	user_id: body.user_id,
    	fence: body.fence,
		event: body.event,
		status: body.status,
    	created_by: body.user_id,
    	updated_by: body.user_id
    }).then(function (attendance) {
    	logger.info('attendance : dao : putUserAttendance : success');
		var res = {
            result: 'success',
            json: attendance,
            length: 1
        };
    	callback(null, res);
	}, function (err) {
		logger.info('attendance : dao : putUserAttendance : err : '+JSON.stringify(err));	
    	callback(err);
	});


};



