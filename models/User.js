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
    unique: false,
    trim: true,
    require: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    require: true
  },
  age: {
    type: Number
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim: true
  },
  dob: {
    type: Number,
    default: 18
  },
  orientation: {
    type: String,
    trim: true
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
  instagram: {
    type: String,
    trim: true,
    lowercase: true
  },
  facebook: {
    type: String,
    trim: true,
    lowercase: true
  },
  twitter: {
    type: String,
    trim: true,
    lowercase: true
  },
  snapchat: {
    type: String,
    trim: true,
    lowercase: true
  },
  photos: [{
    url: String,
    likes: {
      type: Number,
      default: 0
    },
    photoindex: Number
  }]
});
module.exports = mongoose.model("User", userSchema);