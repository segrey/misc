var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('watch', function () {
    gulp.watch('./nested-imports/*.less', ['less']);
});

gulp.task('less', function () {
    return gulp.src('./nested-imports/*.less')
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(gulp.dest('./nested-imports'));
});

gulp.task('default', ['less', 'watch']);
