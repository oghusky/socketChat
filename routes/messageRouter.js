const router = require("express").Router();
const { getMessages, postMessage, messageForm } = require("../controllers/messageController");
const { ensureAuth } = require("../config/auth");

router
  .route("/send/:id")
  .get(messageForm);

router
  .route("/:id")
  .post(ensureAuth, postMessage)
  .get(ensureAuth, getMessages);



module.exports = router;