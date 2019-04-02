const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
// Load user model
var User = require('../models/user');

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            // console.log(accessToken);
            const newUser = {
                name: profile.displayName,
                email: profile.emails[0].value,
                usertype : "Student"
            }
            console.log("Name : " + profile.displayName);
            // Check for existing user
            User.findOne({
                email: profile.emails[0].value
            }).then(user => {
                if (user) {
                    // Return user
                    done(null, user);
                } else {
                    // Create user
                    new User(newUser)
                        .save()
                        .then(user => done(null, user));
                }
            })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user));
    });
}