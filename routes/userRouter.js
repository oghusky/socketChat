const router = require("express").Router();
const {
  getAllUsers,
  getProfile,
  putToProfile } = require("../controllers/userController");
const { ensureAuth } = require("../config/auth");

router
  .route("/")
  .get(getAllUsers);

router
  .route("/profile/:id")
  .get(getProfile)
  .put(putToProfile);

module.exports = router;