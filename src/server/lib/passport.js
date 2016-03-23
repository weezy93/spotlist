var passport = require('passport');
var knex = require('../../db/knex');
var helpers = require('./helpers');

require('dotenv').load();
var FacebookStrategy = require('passport-facebook').Strategy;
if (!process.env.NODE_ENV) {
  require('dotenv').config();
}

function Users() {
  return knex('users');
}

// NOT REACHING THE FACEBOOK CALLBACK TO ASSIGN SOMETHING TO REQ.SESSION
passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/facebook/callback',
  state: true,
  profileFields:  ['name', 'displayName'],
}, function (accessToken, refreshToken, profile, done) {
  console.log(profile);

  Users().where('facebook_id', profile.id).then(function (data) {
    if (data.length) {
      return data[0].id;
    } else {
      return Users().insert({
        facebook_id: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
      }, 'id').then(function (id) {
        return id[0];
      });
    }
  })
  .then(function (user) {
    return done(null, user);
  });
}
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  Users().where('id', user).then(function (data) {
    done(null, data);
  });
});

module.exports = passport;
