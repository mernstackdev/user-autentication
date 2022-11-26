const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models/user");
const { compareHash } = require("../utils/helpers");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email, isActive: true });
        if (!user) {
          return done(null, false, "Invalid email or password");
        }

        const isPasswordValid = compareHash(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, "Invalid email or password");
        }

        return done(null, user);
      } catch (error) {
        done(null, false, error);
      }
    }
  )
);
