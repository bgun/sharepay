var io = require("sockets.io");

io.sockets.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('items:add', function (data) {
    console.log("ITEM RECEIVED",data);
  });
});
