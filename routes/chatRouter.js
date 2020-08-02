const router = require("express").Router();
const { getRoomNames, getChosenChat } = require("../controllers/chatController");
const { ensureAuth } = require("../config/auth");

router
  .route("/")
  .get(ensureAuth, getChosenChat)
router
  .route("/:roomName")
  .get(ensureAuth, getRoomNames);

module.exports = router;