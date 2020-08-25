const router = require("express").Router();
const { page404Error } = require('../controllers/errorControllers')

router
  .route("/")
  .get(page404Error);

module.exports = router;