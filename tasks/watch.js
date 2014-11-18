'use strict';

var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');

var paths = {
  copyElements: [
    'assets/views/**/*.html',
    'assets/views/**/*.png'
    ],
  scripts: [
    'assets/javascripts/vender/**/*.js',
    'assets/javascripts/app/**/*.js'
    ],
  styles: [
    'assets/stylesheets/**/*.sass'
    ]
};

gulp.task('connect', function() {
  connect.server({
    root: './public'
  });
});
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./public"
    }
  });
});

gulp.task('scripts', function() {
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
gulp.task('styles', function() {
  del(['public/stylesheets'], function(){});
  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sass({sourcemapPath: '.'}))
    //.on('error', function (e) { console.log(e.message); })
    //.pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(reload({stream:true}));
});
gulp.task('html', function() {
  gulp.src(paths.copyElements)
    .pipe(plumber())
    .pipe(gulp.dest('public'))
    .pipe(reload({stream:true}));
});

gulp.task('watch', function() {
  gulp.run('connect');
  gulp.run('browserSync');

  gulp.watch([paths.scripts], ['scripts']);
  gulp.watch([paths.styles], ['styles']);
  gulp.watch([paths.copyElements], ['html']);
});


