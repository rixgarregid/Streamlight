const gulp = require('gulp')
const plumber = require('gulp-plumber')
const stylus = require('gulp-stylus')
const pug = require('gulp-pug')

const pugCompilePath = './static/index.pug'
const pugWatchPath = './static/**/*.pug'
const stylusCompilePath = './static/styles/streamlight.styl'
const stylusWatchPath = './static/styles/**/*.styl'

gulp.task('pug-compile', () =>
    gulp.src(pugCompilePath)
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./static/'))
)

gulp.task('stylus-compile', () =>
    gulp.src(stylusCompilePath)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest('./static/styles/'))
)

gulp.task('compile', () => ['pug-compile', 'stylus-compile'])

gulp.task('watch', () => {
    gulp.watch(pugWatchPath, ['pug-compile'])
    gulp.watch(stylusWatchPath, ['stylus-compile'])
})

gulp.task('pug-watch', () => gulp.watch(pugWatchPath, ['pug-compile']))
gulp.task('stylus-watch' , () => gulp.watch(stylusWatchPath, ['stylus-compile']))
gulp.task('default', () => ['pug-compile', 'stylus-compile'])
