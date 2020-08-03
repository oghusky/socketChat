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
    const currentUser = await User.findById({ _id: req.params.id });
    res.status(200).render("user/profile", {
      path: "/profile/:id",
      currentUser,
      user: req.user
    })
  } catch (err) {
    res.status(404).render("error/error404", {
      path: "/404"
    })
  }
};

exports.getAddPhoto = async (req, res) => {
  try {
    const currentUser = await User.findById({ _id: req.params.id })
    res.status(200).render("user/add-photo", {
      path: "/add-photo",
      user: req.user,
      currentUser
    });
  } catch (err) {
    res.status(404).render("error/error404")
  }
}

exports.putAddPhotod = async (req, res) => {
  try {
    await User.findById({ _id: req.user.id })
      .then(user => {
        console.log(user)
      })
  } catch (err) { }
}

exports.getUserEditForm = async (req, res) => {
  try {
    const currentUser = await User.findById({ _id: req.params.id });
    res.status(200).render("user/edit-info", {
      path: "/edit_info",
      user: req.user,
      currentUser
    })
  } catch (err) {
    res.status(500).render("error/error505", {
      path: "/505"
    })
  }
}