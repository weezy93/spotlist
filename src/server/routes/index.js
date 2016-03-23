var express = require('express');
var router = express.Router();
var passport = require('../lib/passport');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'spotlist' });
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/',
}), function (req, res, next) {
  console.log('here', req.session);
  res.redirect('/');
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  req.logOut();

  res.redirect('/');
});

router.get('/addSpot', function (req, res, next) {
  res.render('userAddSpot', { styleshee: 'addSpot.css'});
});

module.exports = router;
