const User = require('../models/User');
// array of room names
const chatRooms = [
  "business owners",
  "sports",
  "techies",
  "anime",
  "gamers",
  "lobby",
  "flirt",
  "african american",
  "latinos",
  "asian",
  "newbies",
  "lgbtq",
  "goth",
  "emo",
  "20's",
  "30's",
  "40's",
  "50's",
]

exports.getRoomNames = async (req, res) => {
  try {
    const user = await User.findById(req.user.id.toString());
    let users = [];
    let roomName = req.params.roomName;
    user.whichRoom = roomName;
    user.save();
    users.push(req.user);
    if (chatRooms.includes(roomName.toLowerCase())) {
      res.render("user/chat", {
        roomName: req.params.roomName,
        user: req.user,
        users,
        path: "/chat",
        title: "chat"
      });
    }
  } catch (err) {
    res.redirect("/error")
  }
};
exports.getChosenChat = async (req, res) => {
  try {
    const user = await User.findById(req.user.id.toString());
    user.whichRoom = "";
    user.save();
    req.headers["chat-user"] = `${req.user}`;
    res.status(200).render("user/chooseChat", {
      chatRooms,
      user: req.user,
      roomName: req.params.roomName,
      path: "/chat",
      title: "chat"
    });
  } catch (err) {
    res.redirect("/error")
  }
};
