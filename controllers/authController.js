const User = require("../models/User"),
  bcrypt = require("bcryptjs"),
  passport = require("passport");
const authController = {
  index: async (req, res) => {
    res.render("auth/welcome", { path: "/welcome", user: req.user });
  },
  register: async (req, res) => {
    res.render("auth/register", { path: "/register", user: req.user });
  },
  login: async (req, res) => {
    res.render("auth/login", { path: "/login", user: req.user });
  },
  postRegister: async (req, res) => {
    const { username, name, email, password, password2 } = req.body;
    let errors = [];
    let errCheck = (errors.length > 0 ? errors : '');
    // check required fields
    if (!username || !name || !email || !password || !password2) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (password !== password2) {
      errors.push({ msg: "Passwords don't match" });
    }
    // check password length
    if (password.length < 6) {
      errors.push({ msg: "Password should be at least 6 characters" });
    }
    // checks errors array
    if (errors.length > 0) {
      res.render("auth/register", {
        errCheck, username, name, password, password2
      });
    } else {
      User.findOne({ username })
        .then(user => {
          if (user) {
            errors.push({ msg: "Name already in use" })
            res.render("auth/register", {
              errCheck, username, name, email, password, password2
            });
          } else {
            const newUser = new User({
              username, name, email, password
            });
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                  .then(user => {
                    res.redirect("/login");
                  })
                  .catch(err => console.log(err));
              })
            })
          }
        })
    }
  },
  // post login
  postLogin: async (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/chat",
      failureRedirect: "/login",
    })(req, res, next);
  },
  // logout
  logout: async (req, res) => {
    req.logout();
    res.redirect("/login");
  }
}
module.exports = authController;