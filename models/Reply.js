const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  replyBody: {
    type: String,
    trim: true
  }
});
module.exports = mongoose.model("Reply", replySchema);