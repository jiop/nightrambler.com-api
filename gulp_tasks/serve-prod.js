/**
 * serve the dev environment
 * --nosync
 */
module.exports = function(gulp, $, config) {
  'use_strict';
  var gt = require('./gulp-tools')(gulp, $, config);
  return function() {
    gt.log('Serve application in dev mode');
    gt.serve(false /*isDev*/);
  };
};
