const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    lowercase: true
  },
  name: {
    type: String,
    unique: true,
    trim: true,
    require: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    require: true
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  userimgname: {
    data: Buffer,
    type: String,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages"
    }
  ]
});
module.exports = mongoose.model("User", userSchema);