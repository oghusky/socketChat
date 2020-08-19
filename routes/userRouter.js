const router = require("express").Router();
const {
  getAllUsers,
  getProfile,
  getAddPhoto,
  getUserEditForm,
  putAddPhoto,
  putEditInfo,
  deleteProfile
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
  .route("/:id")
  .get(ensureAuth, getProfile)

router
  .route("/:id/delete")
  .get(ensureAuth, deleteProfile);



module.exports = router;