const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const bs = require('browser-sync').create();
const through2 = require('through2').obj;
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');

const src = {
  sass: 'src/sass/**/*.scss',
  assets: 'src/**/*.+(png|html|woff2|woff|ttf)'
};

gulp.task('sass', function() {
  return gulp.src(src.sass)
             .pipe(sass())
             .pipe(through2(function (file, encoding, callback) {
               file.basename = 'main.css';
               callback(null, file);
              }))
             .pipe(gulp.dest('dist'));
});


gulp.task('assets', function() {
  return gulp.src(src.assets)
             .pipe(gulp.dest('dist'));
});

gulp.task('js', function(callback) {
  webpack(webpackConfig, (err, stats) => {
    logWebpack(err, stats);
    callback();
  });
});

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('watch', function() {
  gulp.watch(src.sass, gulp.series('sass'));
  gulp.watch(src.assets, gulp.series('assets'));
  webpack(webpackConfig).watch({}, logWebpack);
});

gulp.task('serve', function() {
  bs.init({
    server: 'dist'
  });

  bs.watch('dist/**/*.*').on('change', bs.reload);
});

gulp.task('development', gulp.series('clean', 'assets', 'sass', gulp.parallel('watch', 'serve')));

function logWebpack(err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) console.error(info.errors);

  if (stats.hasWarnings()) console.warn(info.warnings);

  console.log(stats.toString({ colors: true }));
}
