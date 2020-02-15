const LocalStrategy = require("passport-local").Strategy;
mongoose = require("mongoose"),
  bcrypt = require("bcryptjs"),
  User = require("../models/User");

// passport param isn't passport module
module.exports = function (passport) {
  // uses localstrategy to check usernamefield
  // in this case usernamefield checks email
  // this checks for previously made users
  passport.use(
    new LocalStrategy({
      usernameField: "username"
    }, (username, password, done) => {
      // match user
      User.findOne({ username })
        .then(user => {
          // if not user
          // return null for error, false for made user
          // and a message
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }
          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" })
            }
          });
        })
        .catch(err => console.log(err));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })
}