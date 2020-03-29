const
  User = require("../models/User"),
  bcrypt = require("bcryptjs"),
  passport = require("passport");

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
  const userimg = req.files.userimg;
  const userimgname = userimg.name;
  const { username, name, email, password, password2 } = req.body;
  let errors = [];
  let errCheck = (errors.length > 0 ? errors : '');

  // Check required fields
  if (!username || !name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check that passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords don't match" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  // If errors were found, send back to register page
  if (errors.length > 0) {
    return res.render("auth/register", {
      errCheck, username, name, password, password2
    });
  }

  User.findOne({ username })
    .then(user => {
      // This user is already registered. Return.
      if (user) {
        errors.push({ msg: "Name already in use" })
        return res.render("auth/register", {
          errCheck, username, name, email, password, password2
        });
      }

      // This user is not registered. Continue.
      const newUser = new User({
        userimgname, username, name, email, password
      });

      req.files.userimg.mv(`./public/images/${userimgname}`)
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