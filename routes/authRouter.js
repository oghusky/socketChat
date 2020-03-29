const router = require("express").Router();
const authController = require("../controllers/authController");

router.route("/")
  .get(authController.getIndex);
  
router.route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin);
  
router.route("/register")
  .get(authController.getRegister)
  .post(authController.postRegister);
  
router.route("/logout")
  .get(authController.getLogout);

module.exports = router;