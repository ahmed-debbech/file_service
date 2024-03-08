var express = require('express');
var router = express.Router();
const fs = require('fs')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/upload', function(req, res, next) {
  console.log(req.body)  
  fs.appendFileSync(req.body.fileName, req.body.chunk.toString())
  res.send("good")
});


module.exports = router;
