var express = require('express');
var router= express.Router();

var path = require('path');
router.use(express.static('public'));

router.post('/multiplication',function(req,res){
  var val=Number(req.body.x)*Number(req.body.y);
  res.send({result:val});
});

router.post('/addition',function(req,res){
  var val=Number(req.body.x)+Number(req.body.y);
  res.send({result:val});
});

router.post('/subtraction',function(req,res){
  var val=Number(req.body.x)-Number(req.body.y);
  res.send({result:val});
});

router.post('/division',function(req,res){
  var val=Number(req.body.x)/Number(req.body.y);
  res.send({result:val});
});

router.post('/modulus',function(req,res){
  var val=Number(req.body.x)%Number(req.body.y);
  res.send({result:val});
});
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'../public/views/index.html'));
});

module.exports = router;
