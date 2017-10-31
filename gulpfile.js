var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('hello', function() {
  console.log('Hello Zell');
});

gulp.task('sass', function(){
  return gulp.src('public/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('public/scss/**/*.scss', ['sass']);
  // Other watchers
  gulp.watch('public/templates/*.html', browserSync.reload);
 gulp.watch('public/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    files: ["**/*.*"],
    proxy: "http://localhost:5000",
    port: 3000,//Or whatever port you want for your application
    ui: {
       port: 5001 //Or whatever port you want for browsersync ui
      }
  })
})
