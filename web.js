var express  = require("express");
var app      = express();
var server   = require('http').createServer(app);
// start listening on port 5000
var port = process.env.PORT || 5000;
var fs       = require("fs");
var url      = require("url");
var _        = require("underscore");
var io       = require("socket.io").listen(server, { port: port });

server.listen(port);

app.use(express.logger());
app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());

// application
var api      = require("./app/api.js");
var email    = require("./app/email.js");

require("./app/processors")(app);





io.sockets.on('connection', function(socket) {
  socket.emit('identify', { clientId: socket.id });
  console.log("CONNECTED SOCKET ID:",socket.id);
  socket.on('cart:item-add', function (data) {
    console.log("ITEM RECEIVED",data);
    api.addItemToCart(data.cartId, data.item, function() {
      socket.broadcast.emit('db:item-added',data);
      console.log("Emitted db:item-added",data);
    });
  });
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
        var resp = {};
        res.set("Content-Type","text/json");
        res.set("Access-Control-Allow-Origin","*");
        resp[n] = r;
        resp.success = true;
        res.send(resp);
      });
    });
  });
};
makeReadApis(["carts","processors","users","vendors"]);


app.post('/api/cart',function(req, res) {
  console.log(req.body);
  var obj = req.body.model;
  api.makeCart(obj,function(cart) {
    res.set("Content-Type","application/json");
    res.set("Access-Control-Allow-Origin","*");
    res.send({
      success: true,
      cart: cart
    });
  });
});

app.put('/api/cart/:id',function(req, res) {
  console.log(req.body);
  var id = req.params.id;
  var obj = JSON.parse(req.body.cart);
  console.log("UPDATING CART TO:",obj);
  api.updateCart(id,obj,function(cart) {
    res.set("Content-Type","text/json");
    res.set("Access-Control-Allow-Origin","*");
    res.send({
      success: true,
      cart: cart
    });
  });
});

app.get('/api/cart/:id',function(req, res) {
  api.getCart(req.params.id,function(cart) {
    res.set("Content-Type","text/json");
    res.set("Access-Control-Allow-Origin","*");
    res.send({
      success: true,
      id: req.params.id,
      cart: cart
    });
  });
});

app.get('/api/user',function(req, res) {
  res.set("Content-Type","text/json");
  res.set("Access-Control-Allow-Origin","*");
  var parts = url.parse(req.url, true);
  var query = parts.query;
  if(query.email) {
    api.getOrCreateUser(query.email,function(user, newuser) {
      res.send({
        success: true,
        user: user,
        newuser: newuser ? true : false
      });
    });
  } else {
    res.send({
      error: "Must specify an email"
    });
  }
});

app.put('/api/user/:id',function(req, res) {
  console.log(req.body);
  var id = req.params.id;
  var obj = JSON.parse(req.body.user);
  console.log("UPDATING CART TO:",obj);
  api.updateUser(id,obj,function(user) {
    res.set("Content-Type","text/json");
    res.set("Access-Control-Allow-Origin","*");
    res.send({
      success: true,
      user: user
    });
  });
});

app.post('/api/user/token', function(req, res){
	var js = JSON.parse(req.body.data);
	console.log(js);
	api.setUserToken(js.email, js.type, js.token);
	res.end();
});
