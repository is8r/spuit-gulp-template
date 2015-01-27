'use strict';

var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');

var paths = {
  scripts: [
    'assets/javascripts/vender/**/*.js',
    'assets/javascripts/app/**/*.js'
    ],
  styles: [
    'assets/stylesheets/**/*.sass'
    ]
};

gulp.task('wp_scripts', function() {
  del(['public/javascripts'], function(){});
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(reload({stream:true}));
});
gulp.task('wp_styles', function() {
  del(['public/stylesheets'], function(){});
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sass({sourcemapPath: '.'}))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(reload({stream:true}));
});

gulp.task('wp_watch', function() {
  gulp.watch([paths.scripts], ['wp_scripts']);
  gulp.watch([paths.styles], ['wp_styles']);
});
