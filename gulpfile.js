var gulp = require('gulp');
var browserSync = require('browser-sync');
var deploy = require('gulp-gh-pages');

gulp.task('js', function() {
  return gulp.src('./app/js/**/*.js')
   .pipe(gulp.dest('./build/js/'))
})

gulp.task('css', function() {
  return gulp.src('./app/css/**/*.css')
   .pipe(gulp.dest('./build/css/'))
})

gulp.task('html', function() {
  return gulp.src('./app/*.html')
   .pipe(gulp.dest('./build/'))
})


gulp.task('default', ['js', 'css', 'html'], function(){
  process.stdout.write('hello')
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
  gulp.watch(['./app/js/**'], ['js', browserSync.reload])
  gulp.watch(['./app/css/**'], ['css', browserSync.reload])
})
