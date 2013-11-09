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
  res.send(query);
});

var capitalize = function(word) {
  return word[0].toUpperCase() + word.substr(1,word.length);
};

var makeReadApis = function(nouns) {
  _.each(nouns,function(n) {
    console.log("creating /api/"+n+" endpoint");
    app.get('/api/'+n,function(req, res) {
      api["get"+capitalize(n)](function(r) {
        res.set("Content-Type","text/json");
        res.send({
          count: r.length,
          vendors: r
        });
      });
    });
  });
};
makeReadApis(["processors","users","vendors"]);


app.post('/api/cart/new',function(req, res) {
  var obj = JSON.stringify(req.body.cart);
  api.makeCart(obj,function(cart) {
    res.set("Content-Type","text/json");
    res.send({
      success: true,
      cart: cart
    });
  });
});

app.get('/api/cart/:id',function(req, res) {
  api.getCart(req.params.id,function(cart) {
    res.set("Content-Type","text/json");
    res.send({
      success: true,
      id: req.params.id,
      cart: cart
    });
  });
});

app.get('/api/user',function(req, res) {
  res.set("Content-Type","text/json");
  var parts = url.parse(req.url, true);
  var query = parts.query;
  if(query.email) {
    api.getOrCreateUser(query.email,function(user) {
      res.send({
        success: true,
        user: user
      });
    });
  } else {
    res.send({
      error: "Must specify an email"
    });
  }
});


// start listening on port 5000

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
