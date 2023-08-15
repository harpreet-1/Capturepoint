const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        "https://projectbackend-na1u.onrender.com/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        return cb(null, profile);
      } catch (error) {
        console.log(error);
      }

      console.log(profile);
    }
  )
);

module.exports = passport;
