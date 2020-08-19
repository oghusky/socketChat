const User = require("../models/User"),
  { imageMin } = require("../gulpfile"),
  fs = require('fs'),
  del = require('del');

const rmImg = async (img) => {
  await del([`public/build/${img}`, '!public/build']);
}

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).render("user/all-users", {
      path: "/all_users",
      allUsers,
      user: req.user
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

exports.putAddPhoto = async (req, res) => {
  try {
    await User.findById({ _id: req.user.id })
      .then(user => {
        rmImg(`/images/${user.userimgname}`)
        const userimg = (req.files === null || req.files === undefined) ? "" : req.files.userimg;
        const userimgname = userimg === "" ? "" : userimg.name;
        if (userimg !== "") {
          user.userimgname = `${user.username}_${userimgname}`;
          req.files.userimg.mv(`./public/images/${user.username}_${userimgname}`);
          imageMin(`${user.username}_${userimgname}`);
        }
        user.save();
        res.redirect(`/user/${user._id}`);
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

exports.putEditInfo = async (req, res) => {
  try {
    await User.findById({ _id: req.params.id })
      .then(user => {
        user.username = req.body.username || user.username;
        user.name = req.body.name || user.name;
        user.dob = req.body.dob || user.dob;
        user.city = req.body.city || user.city;
        user.state = req.body.state || user.state;
        user.gender = req.body.gender || user.gender;
        user.orientation = req.body.orientation || user.orientation;
        user.facebook = req.body.facebook || user.facebook;
        user.twitter = req.body.twitter || user.twitter;
        user.instagram = req.body.instagram || user.instagram;
        user.snapchat = req.body.snapchat || user.snapchat;
        if (req.body.password !== "" && req.body.password === req.body.password2) {
          user.password = req.body.password || user.password;
        }
        user.save();
        res.redirect(`/user/${user._id}`);
      })
  } catch (err) { }

}

exports.deleteProfile = async (req, res) => {
  const user = await User.findOneAndRemove({ _id: req.params.id });
  if (fs.existsSync(`../public/build/${user.userimgname}`)) {
    rmImg(`${user.userimgname}`);
  }
  user.remove();
}