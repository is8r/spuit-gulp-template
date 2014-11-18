'use strict';

var gulp = require('gulp');

require('require-dir')('./tasks');

gulp.task('default', function () {
  gulp.start('watch');
});
