'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');

var paths = {
  copyElements: [
    'assets/**/*.png'
    ],
  scripts: [
    'assets/javascripts/vender/**/*.js',
    'assets/javascripts/app/**/*.js'
    ],
  styles: [
    'assets/stylesheets/**/*.sass'
    ]
};

gulp.task('rails_scripts', function() {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../public/javascripts'));
});
gulp.task('rails_styles', function() {
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sass({sourcemapPath: '.'}))
    .pipe(gulp.dest('../public/stylesheets'));
});
gulp.task('rails_copy', function() {
  gulp.src(paths.copyElements)
    .pipe(plumber())
    .pipe(gulp.dest('../public'));
});

gulp.task('rails', function() {
  gulp.watch([paths.scripts], ['rails_scripts']);
  gulp.watch([paths.styles], ['rails_styles']);
  gulp.watch([paths.copyElements], ['rails_copy']);
});


