const User = require("../models/User"),
  Messages = require("../models/Messages");


exports.getMessages = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) res.redirect('/');
    const messages = await user.messages;
    const mail = await Messages.find({ _id: messages });
    res.status(200).render("messages/showMessages", { mail, user });
  } catch (err) {
    if (err) throw err;
  }
}

exports.messageForm = async (req, res) => {
  try {
    const user = req.user;
    const recipient = await User.findById({ _id: req.params.id });
    res.render("messages/sendMessage", { user, recipient })
  } catch (err) {
    if (err) throw err;
  }
}
exports.postMessage = async (req, res) => {
  const { messageBody } = req.body;
  const sender = req.user; // With mongo session add req.session.user
  try {
    const recipient = await User.findById(req.body.sendingUser);
    const newMessage = new Messages({ sender, recipient, messageBody });
    await newMessage.save();
    recipient.messages.push(newMessage);
    // await recipient.save();
    res.status(201).redirect(`/messages/${req.params.id}`);
  } catch (err) {
    if (err) throw err;
  }

}
exports.deleteMessage = (req, res) => {

}