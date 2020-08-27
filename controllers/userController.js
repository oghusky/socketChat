const User = require("../models/User"),
  cloudinary = require("cloudinary").v2,
  { imageMin } = require("../gulpfile"),
  fs = require('fs'),
  del = require('del');

const rmImg = async (img) => {
  await del([`public/build/${img}`, '!public/build']);
}

const rmDeletedUserImg = async (img) => {
  await del([`public/build/images/${img}`, `!public/build/images`])
}

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).render("user/all-users", {
      path: "/all_users",
      title: "All Users",
      allUsers,
      user: req.user
    });
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }
};

exports.getProfile = async (req, res) => {
  try {
    const currentUser = await User.findById({ _id: req.params.id });
    res.status(200).render("user/profile", {
      path: "/profile/:id",
      title: currentUser.username,
      currentUser,
      user: req.user
    })
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "User doesn't exist")
  }
};

exports.getAddPhoto = async (req, res) => {
  try {
    const currentUser = await User.findById({ _id: req.params.id })
    res.status(200).render("user/add-photo", {
      path: "/add-photo",
      title: "Add A Photo",
      user: req.user,
      currentUser
    });
  } catch (err) {
    res.redirect("/error");
    req.flash("error", "Uh Oh Something went wrong")
  }
}

exports.putAddPhoto = async (req, res) => {
  try {
    const userimg = (req.files === null || req.files === undefined) ? "" : req.files.userimg;
    await User.findOneAndUpdate({ _id: req.user.id }, { new: true }, async (err, user) => {
      if (!err) {
        const userimgname = userimg === "" ? "" : userimg.name;
        if (userimg !== "") {
          user.userimgname = `${user.username}_${userimgname}`;
          req.files.userimg.mv(`./public/images/${user.username}_${userimgname}`);
          imageMin(`${user.username}_${userimgname}`)
          fs.exists(`./public/build/images//${user.username}_${userimgname}`, (file) => {
            if (file) {
              cloudinary.uploader.upload(`./public/build/images/${user.username}_${userimgname}`, async (err, data) => {
                if (err) console.log(err)
                else {
                  user.photos.push({ url: data.url });
                  user.save();
                  rmDeletedUserImg(`/${user.username}_${userimgname}`)
                }
              })
            }
          })
        }
      }
      res.redirect(`/user/${user.id}`);
    })
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }
}

exports.getUserEditForm = async (req, res) => {
  try {
    const currentUser = await User.findById({ _id: req.params.id });
    res.status(200).render("user/edit-info", {
      path: "/edit_info",
      title: "Edit Info",
      user: req.user,
      currentUser
    })
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong");
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
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }

}


exports.deleteConfirm = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
}

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    rmDeletedUserImg(`${user.userimgname}`);
    user.remove();
    res.redirect("/chat");
  } catch (err) {
    res.redirect("/error");
    req.flash("error", "Uh Oh Something went wrong")
  }
}