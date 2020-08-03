const gulp = require('gulp');
const { ejsBuild } = require('./tasks/ejs-build');
const { sassBuild } = require('./tasks/sass-build');
const { imagemin } = require('./tasks/imagemin');
const { browsersync } = require('./tasks/browsersync');
const { webpack } = require('./tasks/webpack');

gulp.task('watch-files', (done) => {
  gulp.watch('./src/html/**/*.ejs', gulp.series(ejsBuild, browsersync.reload));
  gulp.watch('./src/sass/**/*.scss', gulp.series(sassBuild, browsersync.reload));
  gulp.watch('./src/js/**/*.js', gulp.series(webpack, browsersync.reload));
  done();
});

gulp.task('imagemin', gulp.series(imagemin));
gulp.task('build', gulp.series(ejsBuild, sassBuild, webpack));
gulp.task('default', gulp.series(browsersync.server, 'watch-files'));
