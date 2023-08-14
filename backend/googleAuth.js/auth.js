const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const crypto = require("crypto");
// const randomPassword = (byte = 32) => crypto.randomBytes(byte).toString("hex");

// const UserModel = require("../model/user.model");

require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log("from auth.js", profile);
        // let Email = profile._json.email;

        // const user = await UserModel.findOne({ Email });

        // //console.log(user)

        // if (!user) {
        //   console.log("adding new user");

        //   let newuser = new UserModel({
        //     Email,
        //     Name: profile._json.name,
        //     Password: randomPassword(),
        //     Gender: "Male",
        //     isAdmin: false,
        //     Contact: "-",
        //     Location: "-",
        //     isMailVerified: true,
        //   });

        //   await newuser.save();

        //   return cb(null, newuser);
        // } else {
        //   console.log("user is present db");
        //   if (user.isBlocked) {
        //     return cb(null, "Blocked User");
        //   } else {
        return cb(null, profile);
        //   }
        // }
      } catch (error) {
        console.log(error);
      }

      //console.log(profile)
    }
  )
);

module.exports = passport;
