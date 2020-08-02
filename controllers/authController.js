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
      user: req.user
    });
  } catch (err) {
    res.status(500).render("error/error500", {
      path: "/500"
    });
  }
};

exports.getRegister = (req, res) => {
  try {
    res.status(200).render("auth/register", {
      path: "/register",
      user: req.user
    });
  } catch (err) {
    res.status(500).render("error/error500", {
      path: "/500"
    });
  }
};

exports.getLogin = (req, res) => {
  try {
    res.status(200).render("auth/login", {
      path: "/login",
      user: req.user
    });
  } catch (err) {
    res.status(500).render("error/error500", {
      path: "/500"
    });
  }
};

exports.postRegister = (req, res) => {
  const userimg = (req.files === null || req.files === undefined) ? "" : req.files.userimg;
  const userimgname = userimg === "" ? "" : userimg.name;
  const { username, name, email, password, password2 } = req.body;
  if (!username || !name || !email || !password || !password2) {
    console.log("Please complete all fields");
  }

  if (username, name, email, password, password2) {
    if (isValid(password) && password === password2) {
      User.findOne({ username })
        .then(user => {
          // This user is already registered. Return.
          if (user) {
            errors.push({ msg: "Name already in use" })
            return res.render("auth/register", {
              errCheck, username, name, email, password
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
                  return res.redirect("/login");
                })
                .catch(err => {
                  console.log(err);
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
    successRedirect: "/chat",
    failureRedirect: "/login",
  })(req, res, next);
};

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect("/login");
};
