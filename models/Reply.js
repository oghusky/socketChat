const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  replyBody: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model("Reply", replySchema);