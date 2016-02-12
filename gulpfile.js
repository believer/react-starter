var gulp = require('gulp');
var mocha = require('gulp-mocha');
var env = require('gulp-env');

require('./src/compiler.js');

gulp.task('mocha', function() {
  env({
    vars: {
      NODE_ENV: 'production'
    }
  });

  return gulp
    .src('./src/components/**/*.spec.js', { read: false })
    .pipe(mocha());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./src/components/**/*.js', ['mocha']);
});

gulp.task('default', [
  'mocha',
  'watch'
]);
