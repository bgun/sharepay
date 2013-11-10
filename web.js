var express  = require("express");
var app      = express();
var server   = require('http').createServer(app);
// start listening on port 5000
var port = process.env.PORT || 5000;
var _        = require("underscore");
var io       = require("socket.io").listen(server, { port: port });

server.listen(port);

app.use(express.logger());
app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());

// application
var api      = require("./app/api.js")(app);
var orm      = require("./app/orm.js");
var email    = require("./app/email.js");

require("./app/processors")(app);

io.sockets.on('connection', function(socket) {
  socket.emit('identify', { clientId: socket.id });
  console.log("CONNECTED SOCKET ID:",socket.id);
  socket.on('cart:item-add', function (data) {
    console.log("ITEM RECEIVED",data);
    orm.addItemToCart(data.cartId, data.item, function() {
      socket.broadcast.emit('db:item-added',data);
      console.log("Emitted db:item-added",data);
    });
  });
});
