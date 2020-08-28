const User = require("../models/User");

exports.getUserGallery = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.params.userid });
    res.render("gallery/all-photos", {
      path: "gallery",
      title: `${currentUser.username}'s Gallery`,
      currentUser,
      user: req.user
    })
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }
}

exports.getSinglePhoto = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.params.userid });
    const photo = currentUser.photos.filter(photo => photo.photoindex === parseInt(req.params.photoid))[0]
    res.render("gallery/single-photo", {
      path: currentUser.username.toUpperCase(),
      title: currentUser.username.toUpperCase(),
      user: req.user,
      currentUser,
      photo
    })
  } catch (err) {
    res.redirect("/error/error404")
  }
}