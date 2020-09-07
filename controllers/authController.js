const
  User = require("../models/User"),
  bcrypt = require("bcryptjs"),
  passport = require("passport"),
  { isValid } = require("../utils/validatePwd");

exports.getIndex = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).render("auth/welcome", {
      path: "/welcome",
      title: "welcome",
      user: req.user,
      allUsers: allUsers.length,
      onlineUsers: allUsers.filter(user => user.isOnline == "true").length
    });

  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong");
  }
};

exports.getRegister = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).render("auth/register", {
      path: "/register",
      title: "register",
      user: req.user,
      allUsers: allUsers.length,
      onlineUsers: allUsers.filter(user => user.isOnline === true).length
    });
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }
};

exports.getLogin = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).render("auth/login", {
      path: "login",
      title: "login",
      user: req.user,
      allUsers: allUsers.length,
      onlineUsers: allUsers.filter(user => user.isOnline === true).length
    });
  } catch (err) {
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }
};

exports.postRegister = (req, res) => {
  const { username, name, email, password, password2 } = req.body;
  if (username.includes(" ")) {
    return res.render("auth/register", {
      path: "/register",
      title: "Uh Oh",
      user: req.user,
      error: "* User name cannot contain spaces"
    })
  }
  if (username.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,29}$/igm) === null) {
    return res.render("auth/register", {
      path: "/register",
      title: "Uh Oh",
      user: req.user,
      error: `* Username cannot be less than 6 characters
      * Username can only contain a "." or a "_" symbol`
    })
  }
  if (!username || !name || !email || !password || !password2) {
    return res.render("auth/register", {
      path: "/register",
      title: "Uh Oh",
      user: req.user,
      error: "All fields must be filled"
    })
  }
  if (username, name, email, password, password2) {
    if (isValid(password) && password === password2) {
      User.findOne({ username })
        .then(user => {
          // This user is already registered. Return.
          if (user) {
            return res.render("auth/register", {
              title: "Uh Oh",
              user: req.user,
              error: "User name already exists",
              path: "User already exists"
            });
          }
          // This user is not registered. Continue.
          const newUser = new User({ username, name, email, password });
          // compress image
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash("success", `${username} registered`)
                  return res.redirect(`/user/${user.id}`);
                })
                .catch(err => {
                  req.flash("error", "Uh Oh Something went wrong")
                  return res.redirect("/register")
                });
            })
          })
        });
    }
  }
};
exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/user/all_users",
    failureRedirect: "/login",
    failureFlash: "The information entered doesn't match"
  })(req, res, next);
};

exports.getLogout = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.isOnline = false;
  user.whichRoom = "";
  user.save();
  req.logout();
  res.redirect("/login");
};
