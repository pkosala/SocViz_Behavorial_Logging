var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../app/models/user');

mongoose.plugin(schema => { schema.options.usePushEach = true });
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        console.log("In local signup , username, password",username,password);
        process.nextTick(function() {
            User.findOne({'local.username': username}, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    var newUser = new User();

                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {

        User.findOne({ 'local.username': username }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            user.loginHistory.push(Date());  //TODO:change the date format

            user.save(function(err) {
                if (err)
                    throw err;
                return done(null, user);
            });
            return done(null, user);
        });

    }));

};
