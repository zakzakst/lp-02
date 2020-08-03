const gulp = require('gulp');
const fs = require('fs');
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");

// EJSのコンパイル
function ejsBuild() {
  const ejsPath = {
    src: './src/html/*.ejs',
    ignore: './src/html/**/_*.ejs',
    dist: './dist',
    data: './src/html/_module/common/config.json',
  };
  const commonData = JSON.parse(fs.readFileSync(ejsPath.data, 'utf8'));
  return gulp
    .src([ejsPath.src, '!' + ejsPath.ignore])
    .pipe(ejs({commonData}, {}, {ext: '.html'}))
    .pipe(rename({ extname: '.html'}))
    .pipe(gulp.dest(ejsPath.dist));
}

exports.ejsBuild = ejsBuild;
