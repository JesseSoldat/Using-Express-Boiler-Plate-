'use strict';

var User = require('../models/users.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      // console.log('deserializeUser');
      // console.log(user);
      // console.log(user.password);
      done(err, user);

    });
  });

  passport.use(new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true

  },function(req, username, password, done) {
    console.log(req.body);
    process.nextTick(function() {

      User.findOne({
        'username': username
      }, function(err, user) {
        console.log(user);
        if (err) {
          console.error(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          console.log(password);
         
          return done(null, false);
        }
     
        return done(null, user);
      });
    });
  }));

  //Register
  passport.use('register', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
  }, function(req, username, password, done){
    process.nextTick(function(){
      User.findOne({'username' : username}, function(err, user){
        if(err) return done(err);
        if(user) return done(null, false);
        else {
          var newUser = new User();
          newUser.username = username;
          newUser.password = password;

          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

};
