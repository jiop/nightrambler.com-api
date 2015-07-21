var fs          = require('fs');
var morgan      = require('morgan');
var environment = process.env.NODE_ENV || 'production';

module.exports = function(app) {
  'use_strict';

  var morganOptions = {};
  var morganMode = 'combined';

  if (environment === 'production') {
    var logDirectory = './log/';

    // ensure log directory exists
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(
      logDirectory + '/access.log',
      {flags: 'a'}
    );

    morganOptions = {stream: accessLogStream};
  } else if (environment === 'development') {
    morganMode = 'dev';
  }

  app.use(morgan(morganMode, morganOptions));
};
