// Module dependencies

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var winston = require('winston');
var cors = require('cors');

var config = require('config/config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

// Expose
module.exports = function (app, passport) {
  // Compression middleware (should be placed before express.static)
  app.use(compression({ threshold: 512 }));

  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }
  if (env !== 'test') app.use(morgan(log));

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  app.use(cors());

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
