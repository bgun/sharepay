var express = require("express");
var mongoose = require("mongoose");
var fs       = require("fs");
var url      = require("url");

var app      = express();

app.use(express.logger());
app.use(express.static(__dirname + "/public"));

app.get('/', function(request, response) {
  response.send('<h1>SharePay</h1>');
});

app.get('/test',function(req, res) {
  var parts = url.parse(req.url, true);
  var query = parts.query;
  res.send(query);//.join(","));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

mongoose.connect('mongodb://sharepay:456Fintech@paulo.mongohq.com:10085/app19320139');

var Cat = mongoose.model('test', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
