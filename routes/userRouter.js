const router = require("express").Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.getAllUsers);

router
  .route("/profile/:id")
  .get(userController.profile)
  .post(userController.postToProfile);

module.exports = router;