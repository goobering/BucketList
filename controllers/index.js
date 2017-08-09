var express = require('express');
var router = new express.Router();
var path = require('path');
var Country = require('../client/src/models/country');

var BucketQuery = require('../client/db/bucketQuery');
var query = new BucketQuery();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

router.post('/', function(req, res){
  var country = new Country({
    name: req.body.name,
    population: req.body.population,
    capital: req.body.capital
  });
  
  query.add(country);
  res.redirect('/');
});

module.exports = router;