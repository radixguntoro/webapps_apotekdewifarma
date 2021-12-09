var plumber = require('gulp-plumber');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
//var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename') //https://www.npmjs.org/package/gulp-rename

gulp.task('styles', function() {
    gulp.src('scss/vs-style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            style: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(livereload());
});

gulp.task("compressall", function() {
    gulp.src('scss/vs-style.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer("last 3 versions"))
        .pipe(gulp.dest("./css/"))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./css/'));
});

//Watch task
gulp.task('default', function() {
    livereload.listen();
    gulp.watch([
        'scss/vs-style.scss',
        'scss/settings.scss'
    ], ['styles']);
});
