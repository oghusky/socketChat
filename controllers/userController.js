const User = require("../models/User");
const chatController = {
  profile: async (req, res) => {
    res.render("user/profile", { path: "/profile/:id", user: req.user })
  },
  postToProfile: async (req, res) => {
    res.send("posted to profile", { user: req.user })
  }
}
module.exports = chatController;