const router = require("express").Router();
const {
  getAllUsers,
  getProfile,
  getAddPhoto,
  getUserEditForm,
  putAddPhoto,
  putEditInfo,
  putUpdateProfilePic,
  deleteProfile,
  deleteConfirm
} = require("../controllers/userController");
const { ensureAuth } = require("../config/auth");

router
  .route("/all_users")
  .get(ensureAuth, getAllUsers);

router
  .route("/add_photo=:id")
  .get(ensureAuth, getAddPhoto)
  .post(ensureAuth, putAddPhoto);

router
  .route("/edit_info=:id")
  .get(ensureAuth, getUserEditForm)
  .post(ensureAuth, putEditInfo);

router
  .route("/delete=:id")
  .get(ensureAuth, deleteProfile);

router
  .route("/:id/photo=:photoid")
  .post(putUpdateProfilePic)

router
  .route("/:id")
  .get(ensureAuth, getProfile)

// router
//   .route("/:id/confirm")
//   .get(ensureAuth, deleteConfirm);


module.exports = router;