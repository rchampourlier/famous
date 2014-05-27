var gulp      = require('gulp');
var gutil     = require('gulp-util');
var connect   = require('gulp-connect');
var gulpif    = require('gulp-if');
var coffee    = require('gulp-coffee');
var concat    = require('gulp-concat');
var jade      = require('gulp-jade');
var less      = require('gulp-less');
var watch     = require('gulp-watch');

gulp.task('appJS', function() {
  // concatenate compiled .coffee files and js files
  // into build/app.js
  gulp.src(['./app/**/*.js','./app/**/*.coffee'])
    .pipe(gulpif(/[.]coffee$/, coffee({bare: true}).on('error', gutil.log)))
    .pipe(gulp.dest('./build'))
});

gulp.task('appCSS', function() {
  // concatenate compiled Less and CSS
  // into build/app.css
  gulp
    .src([
      './app/**/*.less',
      './app/**/*.css'
    ])
    .pipe(
      gulpif(/[.]less$/,
        less({
          paths: [
            './bower_components/bootstrap/less'
          ]
        })
        .on('error', gutil.log))
    )
    .pipe(
      concat('app.css')
    )
    .pipe(
      gulp.dest('./build')
    )
});

// gulp.task('libJS', function() {
//   // concatenate vendor JS into build/lib.js
//   gulp.src([
//     ]).pipe(concat('lib.js'))
//       .pipe(gulp.dest('./build'));
// });

gulp.task('libCSS',
  function() {
  // concatenate vendor css into build/lib.css
  gulp.src(['!./bower_components/**/*.min.css',
      './bower_components/**/*.css'])
      .pipe(concat('lib.css'))
      .pipe(gulp.dest('./build'));
});

gulp.task('index', function() {
  gulp.src(['./app/index.jade', './app/index.html'])
    .pipe(gulpif(/[.]jade$/, jade().on('error', gutil.log)))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {

  // reload connect server on built file change
  watch({
    'glob': [
      'build/**/*.html',        
      'build/**/*.js',
      'build/**/*.css'
    ]})
    .pipe(connect.reload());

  // Watch files to build
  watch({
    'glob': [
      './app/**/*.coffee', '!./app/**/*_test.coffee',
      './app/**/*.js', '!./app/**/*_test.js'
    ]}
  , function() {
    gulp.start('appJS');
  });

  watch({
    'glob': [
      './app/**/*.less',
      './app/**/*.css'
    ]}
  , function() {
    gulp.start('appCSS');
  });

  watch({
    'glob': [
      './app/index.jade',
      './app/index.html'
    ]}
  , function() {
    gulp.start('index');
  });
});

gulp.task('connect', connect.server({
  root: ['build'],
  port: 9000,
  livereload: true
}));

gulp.task('default', ['connect', 'appJS', 'appCSS', 'index', /*'libJS',*/ 'libCSS', 'watch']);