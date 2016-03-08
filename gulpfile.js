// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint');
    stylish = require('jshint-stylish');
    webpack = require('gulp-webpack');
    uglify = require('gulp-uglify');
    rename = require('gulp-rename');
    path = {
        js : './public/javascripts/**/*.js', //all subfolder and files located in javascripts
        entry : './public/javascripts/chat.js',
        dest : './public/build/'
    }

//webpack config file
var webpackConfig = require('./webpack.config');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src(path.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// configure the webpack task
/*gulp.task('webpack', function() {
   return  gulp.src(path.entry)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(path.dest))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dest));
});*/

gulp.task('webpack', function() {
 return  gulp.src(path.entry)
         .pipe(webpack(webpackConfig))
         .pipe(gulp.dest(path.dest));

 });

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    //gulp.watch(path.js, ['jshint']);
    gulp.watch(path.js, ['webpack']);
});
