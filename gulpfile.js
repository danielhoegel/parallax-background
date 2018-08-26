const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const __SRC__ = 'src';
const __DIST__ = 'dist';
const __DEMO__ = 'demo';

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

gulp.task('css', () => gulp.src(__SRC__ + '/*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest(__DIST__))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist'))
);


gulp.task('demo', () => gulp.src(__DIST__ + '/*.min.*')
    .pipe(gulp.dest(__DEMO__))
);

gulp.task('default', gulp.series([
    'clear',
    gulp.parallel(['js', 'css']),
    'demo'
]));

gulp.task('watch', () => {
    gulp.watch(__SRC__ + '/*.js', gulp.series(['js', 'demo']));
    gulp.watch(__SRC__ + '/*.css', gulp.series(['css', 'demo']));
});
