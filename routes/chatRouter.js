const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { ensureAuth } = require("../config/auth");

router
  .route("/")
  .get(ensureAuth, chatController.chooseChat)
router
  .route("/:roomName")
  .get(ensureAuth, chatController.index);

module.exports = router;