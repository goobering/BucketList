var express = require('express');
var router = new express.Router();
var path = require('path');

// router.use('/api/coffee', require('./coffee.js'));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

module.exports = router;