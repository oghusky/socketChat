const router = require("express").Router();
const {
  getAllUsers,
  getProfile,
  getAddPhoto,
  getUserEditForm } = require("../controllers/userController");
const { ensureAuth } = require("../config/auth");

router
  .route("/all_users")
  .get(getAllUsers);

router
  .route("/add_photo=:id")
  .get(ensureAuth, getAddPhoto);

router
  .route("/edit_info=:id")
  .get(ensureAuth, getUserEditForm);

router
  .route("/:id")
  .get(ensureAuth, getProfile);


module.exports = router;