const gulp = require('gulp')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const { deleteAsync } = require('del')
const terser = require('terser')
const gulpTerser = require('gulp-terser')

exports.clean = function clean() {
  return deleteAsync(['./dist'])
}

exports.script = function script() {
  return gulp.src('./src/notie.js')
  .pipe(gulp.dest('./dist'))
  .pipe(gulpTerser({}, terser.minify))
  .pipe(rename('notie.min.js'))
  .pipe(gulp.dest('./dist'))
}

exports.style = function style(cb) {
  gulp.src(['./src/notie.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist'))
  .pipe(cssnano())
  .pipe(rename('notie.min.css'))
  .pipe(gulp.dest('./dist'))
  cb()
}

exports.default = gulp.series(exports.clean, exports.script, exports.style, function (cb) {
  gulp.watch('./src/notie.scss', exports.style)
  gulp.watch('./src/notie.js', exports.script)
  cb()
})
