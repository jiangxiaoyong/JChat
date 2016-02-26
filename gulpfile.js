// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint');
    stylish = require('jshint-stylish');
    path = {
        js : ['./public/javascripts/*.js']
    }

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src(path.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('./public/javascripts/*.js', ['jshint']);
});
