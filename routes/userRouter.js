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
const { ensureAuth, isOwner } = require("../config/auth");

router
  .route("/all_users")
  .get(ensureAuth, getAllUsers);

router
  .route("/add_photo=:id")
  .get(ensureAuth, isOwner, getAddPhoto)
  .post(ensureAuth, isOwner, putAddPhoto);

router
  .route("/edit_info=:id")
  .get(ensureAuth, isOwner, getUserEditForm)
  .post(ensureAuth, isOwner, putEditInfo);

router
  .route("/delete=:id")
  .get(ensureAuth, isOwner, deleteProfile);

router
  .route("/:id/photo=:photoid")
  .post(ensureAuth, isOwner, putUpdateProfilePic)

router
  .route("/:id")
  .get(ensureAuth, getProfile)

// router
//   .route("/:id/confirm")
//   .get(ensureAuth, deleteConfirm);


module.exports = router;