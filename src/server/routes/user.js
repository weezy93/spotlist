// USER ROUTES
var express = require('express');
var router = express.Router();
var knex = require('../../db/knex.js');
var queries = require('./queries/queries.js');

// Render add spot form, needs user id and the location they are adding to
router.get('/user/:id/:location/addSpot', function (req, res, next) {
  res.render('userAddSpot');
});

router.post('/user/:id/:location/addSpot', function (req, res, next) {
  res.send('added spot');

  // Add to user's spot table depending on location
});
