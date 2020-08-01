const { src, dest } = require('gulp'),
  fs = require('fs'),
  path = require('path'),
  imagemin = require('gulp-imagemin');

exports.imageMin = (img) => {
  return src(`public/images/${img}`)
    .pipe(imagemin())
    .pipe(dest('public/build/images'));
};

exports.rmImage = (img) => {
  return fs.unlink(`public/images/${img}`, (err) => {
    if (err) console.log(err);
    console.log("File removed :)");
  })
}