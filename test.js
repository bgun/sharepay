var _       = require("underscore");
var fs      = require("fs");
var express = require("express");
var mongoos = require("mongoose");

var app = express();

function getStaticFile(filename, callback) {
  fs.readFile("public/"+filename,function(err,f) {
    if(err) {
      throw err;
    }
    callback.call(null,f);
  });
}

console.log("Running server from "+__dirname);

app.use(express.static(__dirname + "/public"));

app.listen(8080);

app.get("/test",function(req, res) {
  console.log(req);
  getStaticFile("anim.gif",function(f) {
    res.set("Content-Type","image/gif");
    res.send(f);
  });
});
