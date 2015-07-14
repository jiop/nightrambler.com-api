require('app-module-path').addPath(__dirname);

var env  = require('node-env-file');
var path = require('path');
env(path.join(__dirname, '.env'));

var fs       = require('fs');
var express  = require('express');
var mongoose = require('mongoose');
var config   = require('config/config');

var app = express();
var port = process.env.PORT || 3000;

process.env.NODE_PATH = "./config:./app/controllers";

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap application settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(port);
console.log('Express app started on port ' + port);

// Expose
module.exports = app;
