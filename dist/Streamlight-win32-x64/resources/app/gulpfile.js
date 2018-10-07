const gulp = require('gulp')
const plumber = require('gulp-plumber')
const stylus = require('gulp-stylus')
const pug = require('gulp-pug')

const pugCompilePath = './static/index.pug'
const pugWatchPath = './static/**/*.pug'
const stylusCompilePath = './static/styles/streamlight.styl'
const stylusWatchPath = './static/styles/**/*.styl'

gulp.task('build:pug', () =>
    gulp.src(pugCompilePath)
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./static/'))
)

gulp.task('build:stylus', () =>
    gulp.src(stylusCompilePath)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest('./static/styles/'))
)

gulp.task('build', () => ['build:pug', 'build:stylus'])

gulp.task('watch', () => {
    gulp.watch(pugWatchPath, ['build:pug'])
    gulp.watch(stylusWatchPath, ['build:stylus'])
})

gulp.task('default', () => ['build'])
