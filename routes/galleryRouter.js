const router = require('express').Router([{ mergeParams: true }]);
const { ensureAuth } = require('../config/auth');
const { getUserGallery, getSinglePhoto } = require('../controllers/galleryController');

router
  .route("/:userid")
  .get(ensureAuth, getUserGallery);

router
  .route("/:userid/photo=:photoid")
  .get(ensureAuth, getSinglePhoto);
module.exports = router;