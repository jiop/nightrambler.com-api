var compression  = require('compression');
var responseTime = require('response-time');
var bodyParser   = require('body-parser');
var errorhandler = require('errorhandler');
var cors         = require('cors');
var pkg          = require('../package.json');

module.exports = function(app) {
  'use_strict';

  // Compression middleware (should be placed before express.static)
  app.use(compression({threshold: 512}));

  app.use(responseTime());

  // load logger
  require('./logger')(app);

  // add cors headers
  app.use(cors());

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(errorhandler());
};
