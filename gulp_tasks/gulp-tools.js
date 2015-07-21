module.exports = function(gulp, $, config) {
  /**
   * Utility functions
   */
  var self = {};
  var port = process.env.PORT || config.defaultPort;
  var args = require('yargs').argv;
  var path = require('path');
  var _    = require('lodash');

  /**
   * serve the code
   * --nosync
   * @param  {Boolean} isDev - dev or build mode
   * @param  {Boolean} specRunner - server spec runner html
   */
  self.serve = function(isDev, specRunner) {
    var nodeOptions = self.getNodeOptions(isDev);
    if (args.verbose) {
      console.log(nodeOptions);
    }
    return $.nodemon(nodeOptions)
      .on('restart', ['vet'], function(ev) {
        self.log('*** nodemon restarted');
        self.log('files changed:\n' + ev);
      })
      .on('start', function() {
        self.log('*** nodemon started');
      })
      .on('crash', function() {
        self.log('*** nodemon crashed: script crashed for some reason');
      })
      .on('exit', function() {
        self.log('*** nodemon exited cleanly');
      });
  };

  self.getNodeOptions = function(isDev) {
    return {
      script: config.nodeServer,
      delayTime: 1,
      env: {
        'PORT': port,
        'NODE_ENV': isDev ? 'development' : 'production'
      },
      watch: [config.server]
    };
  };

  /**
   * Format and return the header for files
   * @return {String}           Formatted file header
   */
  self.getHeader = function() {
    var pkg = require('../package.json');
    var template = ['/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @authors <%= pkg.authors %>',
      ' * @version v<%= pkg.version %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license <%= pkg.license %>',
      ' */',
      ''
    ].join('\n');
    return $.header(template, {
      pkg: pkg
    });
  };

  /**
   * Log a message or series of messages using chalk's blue color.
   * Can pass in a string, object or array.
   */
  self.log = function(msg) {
    if (typeof(msg) === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          $.util.log($.util.colors.blue(msg[item]));
        }
      }
    } else {
      $.util.log($.util.colors.blue(msg));
    }
  };

  /**
   * Show OS level notification using node-notifier
   */
  self.notify = function(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
      sound: 'Bottle',
      contentImage: path.join(__dirname, 'gulp.png'),
      icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
  };

  /**
   * Log an error message and emit the end of a task
   */
  self.errorLogger = function(error) {
    self.log('*** Start of Error ***');
    self.log(error);
    self.log('*** End of Error ***');
    this.emit('end');
  };

  /**
   * Format a number as a percentage
   * @param  {Number} num       Number to format as a percent
   * @param  {Number} precision Precision of the decimal
   * @return {String}           Formatted perentage
   */
  self.formatPercent = function(num, precision) {
    return (num * 100).toFixed(precision);
  };

  /**
   * When files change, log it
   * @param  {Object} event - event that fired
   */
  self.changeEvent = function(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    self.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
  };

  return self;
};
