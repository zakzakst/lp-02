const gulp = require('gulp');
const sass = require('gulp-sass');

// SCSSのコンパイル
function sassBuild() {
  const scssPath = {
    src: './src/sass/*.scss',
    dist: './dist/css',
  };
  return gulp
    .src(scssPath.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(scssPath.dist));
}

exports.sassBuild = sassBuild;
