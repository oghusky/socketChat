const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send({
      path: "/all_users",
      allUsers
    });
  } catch (err) {
    res.status(404).send({
      path: "/404"
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.status(200).render("user/profile", {
      path: "/profile/:id",
      user: req.user
    })
  } catch (err) {
    res.status(404).render("error/error404", {
      path: "/404"
    })
  }
};

exports.putToProfile = async (req, res) => {
  try {
    res.status(200).send("posted to profile", {
      user: req.user
    })
  } catch (err) {
    res.status(404).render("error/error404", {
      path: "/404"
    })
  }
};

exports.getUserEditForm = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    res.status(200).render("user/edit-info", {
      path: "/edit_info",
      user
    })
  } catch (err) {
    res.status(500).render("error/error505", {
      path: "/505"
    })
  }
}