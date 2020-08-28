const User = require("../models/User"),
  cloudinary = require('cloudinary').v2;

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

exports.deletePhoto = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.userid }, { new: true }, (err, user) => {
      const photo = user.photos.filter(photo => photo.photoindex === parseInt(req.params.photoid))[0].public_id;
      const removeid = user.photos.map(photo => photo.photoindex).indexOf(parseInt(req.params.photoid));
      cloudinary.uploader.destroy(photo)
        .then(() => {
          user.photos.splice(removeid, 1);
          user.save();
        }).then(() => res.redirect(`/gallery/${user.id}`))
        .catch(err => console.warn(err));
    })
  } catch (err) {
    res.redirect("/error");
  }
}

exports.putLikePhoto = async (req, res) => {
  await User.findOneAndUpdate({ _id: req.params.userid }, { new: true }, (err, user) => {
    user.photos.filter(photo => photo.photoindex === parseInt(req.params.photoid) ? photo.likes++ : null);
    user.save();
    res.redirect(`/gallery/${user.id}`)
  })
}