const router = require("express").Router();
const {
  getIndex,
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  getLogout } = require("../controllers/authController");

router.route("/")
  .get(getIndex);

router.route("/login")
  .get(getLogin)
  .post(postLogin);

router.route("/register")
  .get(getRegister)
  .post(postRegister);

router.route("/logout")
  .get(getLogout);


module.exports = router;