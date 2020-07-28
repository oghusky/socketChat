const router = require("express").Router();
const { index, chooseChat } = require("../controllers/chatController");
const { ensureAuth } = require("../config/auth");

router
  .route("/")
  .get(ensureAuth, chooseChat)
router
  .route("/:roomName")
  .get(ensureAuth, index);

module.exports = router;