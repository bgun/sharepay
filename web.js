var express = require("express");
var app = express();

app.use(express.logger());
app.use(express.static(__dirname + "/public"));

app.get('/', function(request, response) {
  response.send('<h1>SharePay</h1>');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
