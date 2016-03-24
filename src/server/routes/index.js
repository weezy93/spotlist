var express = require('express');
var router = express.Router();
var passport = require('../lib/passport');
var queries = require('./queries/queries.js');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'spotlist', stylesheet: '/main.css' });
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/',
}), function (req, res, next) {
  res.redirect('/user/' + req.user);
});

router.get('/logout', function (req, res, next) {
  req.session = null;
  req.logOut();
  res.redirect('/');
});

router.get('/user/:id', function (req, res, next) {
  queries.getSingleUser(req.params.id).then(function (result) {
    res.render('userProfile', { user: result[0], stylesheet: 'main.css' });
  });
});

// Test user route

module.exports = router;
