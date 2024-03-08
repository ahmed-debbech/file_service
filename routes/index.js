var express = require('express');
var router = express.Router();
const fs = require('fs')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/upload', function(req, res, next) {
  console.log(req.body)  
  if(req.body.chunk == '') {res.send('not good');  return;}

  let uin = new Uint8Array(req.body.chunk.split(',').map(x => parseInt(x, 10)))

  fs.appendFileSync(req.body.fileName, uin)
  res.send("good")
});


module.exports = router;
