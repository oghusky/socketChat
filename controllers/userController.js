
const User = require("../models/User"),
  cloudinary = require("cloudinary").v2,
  fs = require('fs'),
  del = require('del');

const rmImg = async (img) => {
  await del([`public/images/${img}`, '!public/images']);
}
const rmDeletedUserImg = async (img) => {
  await del([`public/build/images/${img}`, `!public/build/images`])
  return await rmImg(img);
}
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const loggedUser = await User.findById(req.user.id);
    loggedUser.isOnline = true;
    loggedUser.save();
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
      user: req.user,
      currentUser
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
    const userimgname = userimg === "" ? "" : userimg.name;
    await User.findOneAndUpdate({ _id: req.user.id }, { new: true }, async (err, user) => {
      if (!err && user.photos.length < 3) {
        if (req.files.userimg.name !== "") {
          if (req.files.userimg.mimetype === 'image/png' ||
            req.files.userimg.mimetype === 'image/jpg' ||
            req.files.userimg.mimetype === 'image/jpeg' ||
            req.files.userimg.mimetype === 'image/gif') {
            req.files.userimg.mv(`./public/images/${user.username}_${userimgname}`);
            fs.exists(`./public/images/${user.username}_${userimgname}`, (file) => {
              if (file) {
                const date = new Date();
                const hour = date.getHours();
                const minutes = date.getMinutes();
                const day = date.getDay();
                const year = date.getFullYear();
                const timestamp = hour + minutes + day + year
                cloudinary.uploader.upload(`./public/images/${user.username}_${userimgname}`, { quality: "auto:low" })
                  .then(async photo => {
                    user.photos.push({ url: photo.url, photoindex: timestamp, public_id: photo.public_id })
                    user.userimgname = photo.url;
                    user.save();
                  })
                  .then(async () => {
                    await rmImg(`${user.username}_${userimgname}`)
                    res.redirect(`/user/${user.id}`)
                  })
                  .catch(err => console.warn(err))
              }
            })
          }
        }
      }
      else {
        res.redirect(`/user/${user.id}`)
        req.flash("error", "You have reached your photo limit");
      }
    })
  } catch (err) {
    res.redirect("/error")
  }
}


exports.putUpdateProfilePic = async (req, res) => {
  try {
    const photoid = parseInt(req.params.photoid)
    await User.findOneAndUpdate({ _id: req.params.id }, { new: true }, (err, user) => {
      user.userimgname = user.photos.filter(photo => photo.photoindex === photoid)[0].url;
      user.save();
      res.redirect(`/user/${user.id}`)
    })
  } catch (err) {
    res.redirect("/error")
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
        user.save();
        res.redirect(`/user/${user._id}`);
      })
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }

}

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    const pubid = user.photos.map(photo => photo.public_id);
    pubid.forEach(photo => {
      cloudinary.uploader.destroy(photo)
        .then(() => console.log("removed"))
        .catch(err => console.warn(err));
    })
    rmDeletedUserImg(`${user.userimgname}`);
    user.remove();
    res.redirect("/chat");
  } catch (err) {
    res.redirect("/error");
    req.flash("error", "Uh Oh Something went wrong")
  }
}
