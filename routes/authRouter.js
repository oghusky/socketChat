const router = require("express").Router();
const authController = require("../controllers/authController");

router.route("/")
  .get(authController.index);
router.route("/login")
  .get(authController.login)
  .post(authController.postLogin);
router.route("/register")
  .get(authController.register)
  .post(authController.postRegister);
router.route("/logout")
  .get(authController.logout);

module.exports = router;