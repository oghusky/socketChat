const { src, dest, task } = require('gulp'),
  del = require('del'),
  imagemin = require('gulp-imagemin');

// ============= Delete original image uploaded by user
const rmImg = async (img) => {
  await del([`public/images/${img}`, '!public/images']);
}

exports.imageMin = (img) => {
  src(`public/images/${img}`)
    .pipe(imagemin())
    .pipe(dest('public/build/images'));
  rmImg(img);
};