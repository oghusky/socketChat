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
  password2: {
    type: String,
    trim: true,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userimgname: {
    data: Buffer,
    type: String,
    default: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
  }
});
module.exports = mongoose.model("User", userSchema);