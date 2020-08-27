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