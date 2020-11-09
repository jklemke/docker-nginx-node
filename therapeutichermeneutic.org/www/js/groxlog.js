const path = require('path');
const fs = require('fs');

const getIntPaddedWithLeftZeros = function(i,width){
	return (`0${i}`.slice(-width));
}

const getLogDir = (function () {
	let logDir = '';
	return function() {
		if (logDir.length === 0) {
			logDir = path.join(__dirname,'../../', 'log');
			fs.mkdir(
				logDir,
				{},
				err => {
					if(err && err.code != 'EEXIST') throw err;
					//console.log(`SUCCESS: mkdir ${logDir}` );
				}
			);
		}
		return logDir;
	}
})();

const getTimeStampAsString = function () {
	let date = new Date();
	let timeStamp = 
		date.getFullYear() 
		+ '-' 
		+ getIntPaddedWithLeftZeros(date.getMonth()+1,2) 
		+ '-' 
		+ getIntPaddedWithLeftZeros(date.getDate(),2) 
		+ ' ' 
		+ getIntPaddedWithLeftZeros(date.getHours(),2) 
		+ ':' 
		+ getIntPaddedWithLeftZeros(date.getMinutes(),2) 
		+ ':' 
		+ getIntPaddedWithLeftZeros(date.getSeconds(),2) 
		+ '.' 
		+ getIntPaddedWithLeftZeros(date.getMilliseconds(),3);
	return timeStamp;
}

const getTodaysLogFileName = function () {
	let date = new Date();
	let fileName = 
		date.getFullYear() 
		+ '-' 
		+ getIntPaddedWithLeftZeros(date.getMonth()+1,2) 
		+ '-' 
		+ getIntPaddedWithLeftZeros(date.getDate(),2) 
		+ '.log';
	let logDir = getLogDir();
	let todaysLogFileName = path.join(logDir, fileName);
	return todaysLogFileName;
}

const getInitializedLogFileName = (function() {
	let initializedLogFileName = '';
	return function() {
		let todaysLogFileName = getTodaysLogFileName();
		if (initializedLogFileName !== todaysLogFileName) {
			let timeStamp = getTimeStampAsString();
			// attempt to access file, and create it if it doesn't exist
			fs.access(todaysLogFileName, fs.constants.F_OK , (err) => {
				if (err) {
					fs.appendFile(
						todaysLogFileName,
						`INIT: ${timeStamp}\n`,
						err => {
							if(err) throw err;
							//console.log(`SUCCESS: init ${todaysLogFileName}`);
						}
					)					
				} 
			});			
		}
		initializedLogFileName = todaysLogFileName;
		return initializedLogFileName;
	}
})();


appendToLogFile = function (msg) {
	let todaysLogFileName = getInitializedLogFileName();
	let timeStamp = getTimeStampAsString();
	fs.appendFile(
		todaysLogFileName,
		`INFO: ${timeStamp} ${msg}\n`,
		err => {
			if(err) throw err;
			//console.log(`SUCCESS: append ${todaysLogFileName}`);
		}
	)
}

const GroxLog = (
	// an anonymous function that is a wrapper for any static attributes and methods, and which returns the constructor function
	function() 	{
		// private static attribute defined once and available to all object instances
		let numGroxLogs = 0;
		
		// return the anonymous function that gets called via the "new" keyword
        return function(f) {			

			// public functions 
			this.appendToLogFile = appendToLogFile;

            // constructor code here runs  when the object is instantiated
            numGroxLogs++; // private static attribute keeps track of how many calls
            if(numGroxLogs > 1) throw new Error('Only 1 GroxLog object allowed');

			let todaysLogFileName = getInitializedLogFileName();
			console.log(`LogFile: ${todaysLogFileName}`);
        }
	}
)();

exports.GroxLog = GroxLog;
