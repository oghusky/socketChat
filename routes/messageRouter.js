const router = require("express").Router();
const {
  getMessages,
  postMessage,
  messageForm,
  getReplyForm,
  postReply } = require("../controllers/messageController");
const { ensureAuth } = require("../config/auth");

router
  .route("/send/:id")
  .get(messageForm);

router.route('/reply/:id')
  .get(getReplyForm)
  .post(postReply);

router
  .route("/:id")
  .post(ensureAuth, postMessage)
  .get(ensureAuth, getMessages);



module.exports = router;