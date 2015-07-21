require('app-module-path').addPath(__dirname);

var env         = require('node-env-file');
var path        = require('path');
env(path.join(__dirname, '.env'));
var fs          = require('fs');
var express     = require('express');
var mongoose    = require('mongoose');
var config      = require('config/config');

var environment = process.env.NODE_ENV;
var port        = process.env.PORT || 8089;

var app         = express();

// Connect to mongodb
var connect = function() {
  var options = {server: {socketOptions: {keepAlive: 1}}};
  mongoose.connect(config.db, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
  if (~file.indexOf('.js')) {
    require(__dirname + '/app/models/' + file);
  }
});

console.log('Start node server on ' + port + ' in ' + environment + ' mode');

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});

// Expose
module.exports = app;
