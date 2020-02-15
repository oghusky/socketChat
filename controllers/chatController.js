const User = require("../models/User");

// array of room names
const chatRooms = [
  "african american",
  "lobby", "20's", "30's",
  "40's", "50's", "flirting",
  "latinos", "lgbtq", "gamers",
  "sports", "gothic", "emo", "newbies"
]

const chatController = {
  index: async (req, res) => {
    let roomName = req.params.roomName;
    if (chatRooms.includes(roomName)) {
      req.headers["chat-user"] = `${req.user}`;
      res.render("user/chat", { roomName, user: req.user });
    } else {
      res.status(302).redirect("/");
    }
  },
  chooseChat: async (req, res) => {
    req.headers["chat-user"] = `${req.user}`;
    res.render("user/chooseChat", { chatRooms, user: req.user });
  }
}
module.exports = chatController;