const
  User = require("../models/User"),
  bcrypt = require("bcryptjs"),
  passport = require("passport"),
  { imageMin } = require("../gulpfile"),
  { isValid } = require("../utils/validatePwd");

exports.getIndex = (req, res) => {
  try {
    res.status(200).render("auth/welcome", {
      path: "/welcome",
      title: "welcome",
      user: req.user,
    });

  } catch (err) {
    // res.status(500).render("error/error500", {
    //   path: "/500",
    //   title: "500"
    // });
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong");
  }
};

exports.getRegister = (req, res) => {
  try {
    res.status(200).render("auth/register", {
      path: "/register",
      title: "/register",
      user: req.user
    });
  } catch (err) {
    // res.status(500).render("error/error500", {
    //   path: "/500",
    //   title: "500"
    // });
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }
};

exports.getLogin = (req, res) => {
  try {
    res.status(200).render("auth/login", {
      path: "login",
      title: "login",
      user: req.user
    });
  } catch (err) {
    // res.status(500).render("error/error500", {
    //   path: "/500",
    //   title: "500"
    // });
    res.redirect("/error")
    req.flash("error", "Uh Oh Something went wrong")
  }
};

exports.postRegister = (req, res) => {
  const userimg = (req.files === null || req.files === undefined) ? "" : req.files.userimg;
  const userimgname = userimg === "" ? "" : userimg.name;
  const { username, name, email, password, password2 } = req.body;
  if (username.includes(" ")) {
    return res.render("auth/register", {
      path: "/register",
      title: "Uh Oh",
      user: req.user,
      error: "User name cannot contain spaces"
    })
  }
  if (!username || !name || !email || !password || !password2) {
    req.flash("error", "Please complete all fields")
  }
  if (username, name, email, password, password2) {
    if (isValid(password) && password === password2) {
      User.findOne({ username })
        .then(user => {
          // This user is already registered. Return.
          if (user) {
            return res.render("auth/register", {
              username,
              name,
              email,
              password,
              title: "Uh Oh",
              user: req.user,
              error: "User name already exists",
              path: "User already exists"
            });
          }
          // This user is not registered. Continue.
          const newUser = new User({
            userimgname: `${username}_${userimgname}`, username, name, email, password
          });
          // moves image files
          if (userimg !== "") {
            req.files.userimg.mv(`./public/images/${username}_${userimgname}`)
            // =============== IMAGE COMPRESSION ============================
            imageMin(`${username}_${userimgname}`);
          };
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

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect("/login");
};
