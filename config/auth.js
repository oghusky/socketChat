const User = require('../models/User');
module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
  isOwner: async function (req, res, next) {
    if (req.isAuthenticated()) {
      await User.findById(req.params.id, (err, user) => {
        if (user.id === req.user.id) {
          next();
        } else {
          res.redirect("back");
        }
      })
    }
  }
}