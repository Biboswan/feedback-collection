const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); // mongo database id 
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true 
        //google strategy by default treats proxy server as insecure and serve http.
        //Heroku has a proxy 
		}, async (accessToken, refreshToken, profile, done) => {
           const existingUser = await User.findOne({ googleID: profile.id});
           if (existingUser) {
              return done(null, existingUser);
           } 
            const user = await new User({ googleID: profile.id }).save();
            done(null, user);
        }
		
	)
);
