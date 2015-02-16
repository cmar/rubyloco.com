var gulp = require('gulp');
var browserSync = require('browser-sync');
var deploy = require('gulp-gh-pages');

gulp.task('js', function() {
  return gulp.src(['./app/js/app.js',
            './bower_components/angular/angular.min.*'])
   .pipe(gulp.dest('./build/js/'))
})

gulp.task('html', function() {
  return gulp.src('./app/*.html')
   .pipe(gulp.dest('./build/'))
})

gulp.task('deploy', ['default'], function () {
  return gulp.src('./build/**/*')
    .pipe(deploy())
})

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  })

  gulp.watch(['./app/*.html'], ['html', browserSync.reload])
  gulp.watch(['./app/**/*.js'], ['js', browserSync.reload])
})

gulp.task('default', ['js', 'html'], function(){
  process.stdout.write('hello')
})
