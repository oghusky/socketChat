const User = require('../models/User');
// array of room names
// const chatRooms = [
//   "business owners",
//   "sports",
//   "techies",
//   "anime",
//   "gamers",
//   "lobby",
//   "flirt",
//   "african american",
//   "latinos",
//   "asian",
//   "newbies",
//   "lgbtq",
//   "goth",
//   "emo",
//   "20's",
//   "30's",
//   "40's",
//   "50's",
// ]
const chatRooms = [
  "north",
  "south",
  "east",
  "west",
  "midwest",
  "international"
]
exports.getRoomNames = async (req, res) => {
  try {
    let roomName = req.params.roomName;
    const user = await User.findById(req.user.id);
    user.whichRoom = roomName;
    user.save();
    if (chatRooms.includes(roomName.toLowerCase())) {
      res.render("user/chat", {
        roomName: req.params.roomName,
        user: req.user,
        path: "/chat",
        title: "chat"
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/error")
  }
};
exports.getChosenChat = async (req, res) => {
  try {
    const allUsers = await User.find();
    const user = await User.findById(req.user.id.toString());
    user.whichRoom = "";
    user.save();
    req.headers["chat-user"] = `${req.user}`;
    res.status(200).render("user/chooseChat", {
      chatRooms,
      user: req.user,
      roomName: req.params.roomName,
      allUsers,
      path: "/chat",
      title: "chat"
    });
  } catch (err) {
    console.log(err);
    res.redirect("/error")
  }
};
