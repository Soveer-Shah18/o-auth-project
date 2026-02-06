const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },

  //happens after the google logs in the user
  async(accessToken,refreshToken,profile,done)=>{

    try{

        const email = profile.emails[0].value;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const photo = profile.photos?.[0]?.value;

        let user = await User.findOne({emailId:email});

        if(!user)
        {
            user = await User.create({
                firstName,
                lastName,
                emailId:email,
                photo,
                password: "GOOGLE_AUTH"
            })
        }

        done(null,user);
    }
    catch(err)
    {
        done(err,null);
    }
  }

));

module.exports = passport;