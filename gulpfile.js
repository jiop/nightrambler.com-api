var gulp    = require('gulp');
var $       = require('gulp-load-plugins')({lazy: true});
var config  = require('./gulp.config')();
var gt      = require('./gulp_tasks/gulp-tools')(gulp, $, config);

function getTask(task) {
  return require('./gulp_tasks/' + task)(gulp, $, config);
}

gulp.task('default', ['help']);
gulp.task('help', $.taskListing);

gulp.task('vet', getTask('vet'));
gulp.task('test', ['vet'], getTask('test'));
gulp.task('serve', ['serve-dev'], function() {});
gulp.task('serve-dev', getTask('serve-dev'));
gulp.task('serve-prod', getTask('serve-prod'));
