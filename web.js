var express  = require("express");
var fs       = require("fs");
var url      = require("url");
var _        = require("underscore");

// application
var api   = require("./api.js");
var email = require("./email.js");

// go
var app   = express();

app.use(express.logger());
app.use(express.static(__dirname + "/public"));

app.get('/', function(request, response) {
  response.send('<h1>SharePay</h1>');
});

// playing with querystrings
app.get('/test',function(req, res) {
  var parts = url.parse(req.url, true);
  var query = parts.query;
  res.send(query);//.join(","));
});

app.get('/api/vendors',function(req, res) {
  api.getVendors(function(vendors) {
    res.set("Content-Type","text/json");
    res.send({
      count: vendors.length,
      vendors: vendors
    });
  });
});


// start listening on port 5000

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

/*
var Cat = mongoose.model('test', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
*/
