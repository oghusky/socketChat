const User = require("../models/User");

// array of room names
const chatRooms = [
  "cosplayers", "business owners",
  "lobby", "20's", "30's",
  "40's", "50's", "flirting",
  "african american", "asian",
  "latinos", "lgbtq", "gamers",
  "sports", "gothic", "emo", "newbies"
]

const chatController = {
  index: async (req, res) => {
    let roomName = req.params.roomName;
    if (chatRooms.includes(roomName)) {
      res.render("user/chat", { roomName: req.params.roomName, user: req.user });
    } else {
      res.status(302).redirect("/");
    }
  },
  chooseChat: async (req, res) => {

    req.headers["chat-user"] = `${req.user}`;
    res.render("user/chooseChat", { chatRooms, user: req.user, roomName: req.params.roomName });
  }
}
module.exports = chatController;