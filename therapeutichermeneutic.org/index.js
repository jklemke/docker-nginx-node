const express = require('express');
const expressApp = express();
const path = require('path');
const groxLog = require('./www/js/groxlog');
const gl = new groxLog.GroxLog();
const portNum = 8181;
const websiteHome = path.join(__dirname, 'www');


expressApp.get('/', function(req, res) {
  res.sendFile(path.join(websiteHome, 'index.html'));
  gl.appendToLogFile('root page request');  
});

expressApp.use(express.static(websiteHome));

expressApp.listen(portNum);
console.log(`listening at port ${portNum}`);

