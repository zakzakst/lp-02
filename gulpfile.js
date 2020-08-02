const gulp = require('gulp');
const fs = require('fs');
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const concat = require( 'gulp-concat' );
const babel = require('gulp-babel');
const browsersync = require("browser-sync").create();


// EJSのコンパイル
gulp.task('ejs-build', (done) => {
  const ejsPath = {
    src: './src/html/**/*.ejs',
    ignore: './src/html/**/_*.ejs',
    dist: './dist',
    data: './src/_module/common/config.json',
  };
  const commonData = JSON.parse(fs.readFileSync(ejsPath.data, 'utf8'));
  gulp
    .src([ejsPath.src, '!' + ejsPath.ignore])
    .pipe(ejs({commonData}, {}, {ext: '.html'}))
    .pipe(rename({ extname: '.html'}))
    .pipe(gulp.dest(ejsPath.dist));
  done();
  console.log('EJS build completed!');
});


// SCSSのコンパイル
gulp.task('sass-build', (done) => {
  const scssPath = {
    src: './src/sass/*.scss',
    dist: './dist/css',
  };
  gulp
    .src(scssPath.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(scssPath.dist));
  done();
  console.log('Sass build completed!');
});


// 画像の圧縮
gulp.task('imagemin', (done) => {
  const imgPath = {
    src: './src/img/**/*.{jpg,jpeg,png,gif,svg}',
    dist: './dist/img',
  };
  gulp
    .src(imgPath.src)
    .pipe(imagemin(
      [
        pngquant({quality: [0.65, 0.8], speed: 1}),
        mozjpeg({quality: 80}),
        imagemin.svgo(),
        imagemin.gifsicle()
      ]
    ))
    .pipe(gulp.dest(imgPath.dist));
  done();
});


// JSの圧縮
gulp.task('js-compress', (done) => {
  const coreScript = './src/js/core/*.js';
  const scriptList = [
    'common',
    // 'top',
  ];
  const jsPath = {
    src: './src/js/**/*.js',
    dist: './dist/js',
  };
  scriptList.forEach(scriptName => {
    let jsSrc = [];
    // 「common」の場合のみ「core」スクリプトを追加（※jQueryの依存関係上、jsをまとめる時の順番を制御する必要がある
    if(scriptName === 'common') {jsSrc.push(coreScript);}
    jsSrc.push('./src/js/' + scriptName + '/**/*.js');
    gulp
      .src(jsSrc)
      .pipe(concat(scriptName + '.js'))
      // .pipe(babel())
      .pipe(gulp.dest(jsPath.dist));
  });
  done();
  console.log('JS compress completed!');
});


// サイトのビルド
gulp.task('build', gulp.series('ejs-build', 'sass-build', 'js-compress', function(done){
  done();
  console.log('Site build completed!');
}));


// サーバーの立ち上げ
gulp.task('build-server', (done) => {
  browsersync.init({
      server: {
          baseDir: "./dist"
      }
  });
  done();
  console.log('Build server started');
});


// 監視ファイル
gulp.task('watch-files', (done) => {
  gulp.watch('./src/html/**/*.ejs', gulp.series('ejs-build', 'browser-reload'));
  gulp.watch('./src/_module/page/**/*.ejs', gulp.series('ejs-build', 'browser-reload'));
  gulp.watch('./src/sass/**/*.scss', gulp.series('sass-build', 'browser-reload'));
  gulp.watch('./src/js/**/*.js', gulp.series('js-compress', 'browser-reload'));
  done();
  console.log(('Watch files started'));
});


// ブラウザのリロード
gulp.task('browser-reload', (done) => {
  browsersync.reload();
  done();
  console.log('Browser reload completed');
});


// タスクの実行
gulp.task('default', gulp.series('build-server', 'watch-files', (done) => {
  done();
  console.log('Default task started');
}));
