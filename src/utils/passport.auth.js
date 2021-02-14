const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pass",
    },
    async (email, pass, done) => {
      try {
        const user = await User.findOne({ email });
        // If User is Not Exist
        if (!user) {
          return done(null, false, { message: "username/email Invaild !!" });
        }
        const isMatch = await user.isVaildPassword(pass);
        // if (isMatch) {
        //   return done(null, user);
        // } else {
        //   return done(null, false, { message: "Incorrect Password !!!" });
        // }
        return isMatch
          ? done(null, user)
          : done(null, false, { message: "Incorrect Password !!!" });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
