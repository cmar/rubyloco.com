var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('js', function() {
  return gulp.src(['./app/js/app.js',
            './bower_components/angular/angular.min.*'])
   .pipe(gulp.dest('./build/js/'))
})

gulp.task('html', function() {
  return gulp.src('./app/*.html')
   .pipe(gulp.dest('./build/'))
})

gulp.task('default', function(){
  process.stdout.write('hello')
})

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  })

  gulp.watch(['./app/*.html'], ['html', browserSync.reload])
  gulp.watch(['./app/**/*.js'], ['js', browserSync.reload])
});
