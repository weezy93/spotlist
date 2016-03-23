// USER ROUTES

router.get('/user/:id/:location/addSpot', function (req, res, next) {
  res.render('userAddSpot');
});
