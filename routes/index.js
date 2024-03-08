var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/upload', function(req, res, next) {
  console.log(req.body)
  res.send("good")
});


module.exports = router;
