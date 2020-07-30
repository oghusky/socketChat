const gulp = require('gulp'),
  fs = require('fs'),
  path = require('path'),
  imagemin = require('gulp-imagemin');

exports.task = (img) => {
  gulp.src(`./public/images/${img}`)
    .pipe(imagemin())
    .pipe(gulp.dest('./public/dist/images'));
}

