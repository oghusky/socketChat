const router = require('express').Router([{ mergeParams: true }]);
const { ensureAuth } = require('../config/auth');
const {
  getUserGallery,
  getSinglePhoto,
  deletePhoto,
  putLikePhoto } = require('../controllers/galleryController');

router
  .route("/:userid")
  .get(ensureAuth, getUserGallery);

router
  .route("/:userid/photo=:photoid")
  .get(ensureAuth, getSinglePhoto);

router
  .route("/:userid/like=:photoid")
  .post(ensureAuth, putLikePhoto);

router
  .route("/:userid/delete=:photoid")
  .get(ensureAuth, deletePhoto)
module.exports = router;