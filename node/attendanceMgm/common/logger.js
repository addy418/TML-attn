var bunyan = require("bunyan");
var log = bunyan.createLogger({
	name:"AttendanceMgmAPIs",
	streams:[{
			path : "attendanceMgmApis.log",
			level: "debug",
    	    period: '1d',          // daily rotation 
            rotateExisting: true,  // Give ourselves a clean file when we start up, based on period 
            threshold: '10m',      // Rotate log files larger than 10 megabytes 
            totalSize: '20m',      // Don't keep more than 20mb of archived log files 
            gzip: true             // Compress the archive log files to save space
	}]
});

module.exports.log = log;



