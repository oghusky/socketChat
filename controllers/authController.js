const
  User = require("../models/User"),
  bcrypt = require("bcryptjs"),
  passport = require("passport"),
  { isValid } = require("../utils/validatePwd"),
  { task } = require("../gulpfile");

const getIndex = async (req, res) => {
  res.render("auth/welcome", { path: "/welcome", user: req.user });
};

const getRegister = async (req, res) => {
  res.render("auth/register", { path: "/register", user: req.user });
};

const getLogin = async (req, res) => {
  res.render("auth/login", { path: "/login", user: req.user });
};

const postRegister = async (req, res) => {
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
          if (userimg !== "") req.files.userimg.mv(`./public/images/${username}_${userimgname}`);
          // compress image
          task(`${username}_${userimgname}`);
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  return res.redirect("/login");
                })
                .catch(err => console.log(err));
            })
          })
        });
    }
  }
};

const postLogin = async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/chat",
    failureRedirect: "/login",
  })(req, res, next);
};

const getLogout = async (req, res) => {
  req.logout();
  res.redirect("/login");
};

module.exports = {
  getIndex,
  getRegister,
  getLogin,
  postRegister,
  postLogin,
  getLogout,
};