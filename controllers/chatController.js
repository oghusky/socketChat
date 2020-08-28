// array of room names
const chatRooms = [
  "business owners", "sports", "techies",
  "anime", "lobby", "20's", "30's",
  "40's", "50's", "flirting",
  "african american", "asian",
  "latinos", "lgbtq", "gamers",
  "sports", "gothic", "emo", "newbies"
]

exports.getRoomNames = (req, res) => {
  try {
    let users = [];
    let roomName = req.params.roomName;
    users.push(req.user);
    if (chatRooms.includes(roomName.toLowerCase())) {
      res.render("user/chat", {
        roomName: req.params.roomName,
        user: req.user, users,
        path: "/chat",
        title: "chat"
      });
    }
  } catch (err) {
    res.redirect("/error")
  }
};
exports.getChosenChat = (req, res) => {
  try {
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
