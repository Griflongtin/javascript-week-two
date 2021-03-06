let gulp = require('gulp'),
browserify = require('browserify'),
source = require('vinyl-source-stream'),
concat = require('gulp-concat'),
utilities = require('gulp-util'),
jshint = require('gulp-jshint'),
del = require('del'),
lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
}),
browserSync = require('browser-sync').create(),
buildProduction = utilities.env.production,
babelify = require("babelify");
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./build/css'));
});
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
  .pipe(concat('vendor.min.js'))
  .pipe(gulp.dest('./build/js'));
});
gulp.task('concatInterface', function(){
  return gulp.src(['js/*-ui.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js']})
  .transform(babelify.configure({
    presets: ["es2015"]
  }))
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'))
});
gulp.task('bower', ['bowerJS', 'bowerCSS']);

gulp.task('build', ['clean'], function(){
  gulp.start('jsBrowserify');
  gulp.start('bower');
});
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
});
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});
