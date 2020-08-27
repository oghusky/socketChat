const router = require('express').Router();
const { ensureAuth } = require('../config/auth');
const { getUserGallery } = require('../controllers/galleryController');

router
  .route("/:userid")
  .get(ensureAuth, getUserGallery);

module.exports = router;