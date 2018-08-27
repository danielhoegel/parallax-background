const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const del = require('del');

const __SRC__ = 'src';
const __DIST__ = 'dist';

gulp.task('clear', () =>
   del([__DIST__])
);

gulp.task('js', () => gulp.src(__SRC__ + '/*.js')
    .pipe(babel({'presets': ['env']}))
    .pipe(gulp.dest(__DIST__))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(__DIST__))
);

gulp.task('default', gulp.series([ 'clear', 'js']));

gulp.task('watch', () => {
    gulp.watch(__SRC__ + '/*.js', gulp.series(['js']));
});
