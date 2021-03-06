var elixir = require('laravel-elixir');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "jobbaextra.app"
    });
});


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "jobbaextra.app"
    });

    gulp.watch("resources/assets/sass/*.scss", ['sass']);
    gulp.watch("public/partials/*.html").on('change', reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("resources/assets/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */
//
//elixir(function(mix) {
//    mix.sass('style.scss');
//});
