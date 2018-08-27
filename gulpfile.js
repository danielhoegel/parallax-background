const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const del = require('del');

const __SRC__ = 'src';
const __DIST__ = 'dist';
const __DOCS__ = 'docs';

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

gulp.task('docs', () => gulp.src(__DIST__ + '/*.min.*')
    .pipe(gulp.dest(__DOCS__))
);

gulp.task('default', gulp.series([ 'clear', 'js', 'docs' ]));

gulp.task('watch', () => {
    gulp.watch(__SRC__ + '/*.js', gulp.series(['js', 'docs']));
});
