var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var calculate=require('./routes/calculate');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',calculate);

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname,'public/views/index.html'));
// });


app.listen(3000);
