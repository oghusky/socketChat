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
    type: String
  }
});

module.exports = mongoose.model("Messages", messageSchema);