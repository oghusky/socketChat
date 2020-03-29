const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    userimgname: {
      data: Buffer,
      type: String
    },
  },
  recipient: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  messageBody: {
    type: String,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply"
    }
  ],
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Messages", messageSchema);