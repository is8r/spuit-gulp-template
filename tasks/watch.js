'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var fileinclude = require('gulp-file-include');
var postcss = require('gulp-postcss');
var filter = require("gulp-filter");
var notify = require('gulp-notify');

var paths = {
  copyElements: [
    'assets/views/**/*.html'
    ],
  railsWatch: [
    '../app/views/**/*.haml',
    'assets/stylesheets/**/*.sass'
    ],
  scripts: [
    'assets/javascripts/vender/**/*.js',
    'assets/javascripts/app/**/*.js'
    ],
  spuitjs: [
    'assets/javascripts/spuit/*.js'
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

gulp.task('spuitjs', function() {
  gulp.src(paths.spuitjs)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('spuit.js'))
    .pipe(gulp.dest('assets/javascripts/vender'));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../public/javascripts'))
    .pipe(reload({stream:true}));
});

gulp.task('styles', function() {
  var processors = [
    require('autoprefixer')({ browsers: ['last 3 version', 'ie 8'], cascade: false })
  ];

  gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(minifycss())
    .pipe(filter("**/*.css"))
    .pipe(postcss(processors))
    .pipe(gulp.dest('../public/stylesheets'))
    .pipe(reload({stream:true}));
});
gulp.task('html', function() {
  gulp.src(paths.copyElements)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(gulp.dest('public'))
    .pipe(reload({stream:true}));
});

gulp.task('watch_reload', function() {
  gulp.run('connect');
  gulp.run('browserSync');

  gulp.watch([paths.copyElements], ['html']);
  gulp.watch([paths.spuitjs], ['spuitjs']);
  gulp.watch([paths.scripts], ['scripts']);
  gulp.watch([paths.styles], ['styles']);
});

gulp.task('watch_rails', function() {
  var bs = require('browser-sync');
  bs.init({
    proxy: 'localhost:3000'
  });

  gulp.watch([paths.scripts], ['scripts']);
  gulp.watch([paths.styles], ['styles']);

  gulp.watch([paths.railsWatch]).on('change', bs.reload);
});

gulp.task('watch_normal', function() {
  gulp.watch([paths.scripts], ['scripts']);
  gulp.watch([paths.styles], ['styles']);
});


