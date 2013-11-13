var _        = require("underscore");
var url      = require("url");
var fs       = require("fs");

var orm      = require("./orm.js");
var email    = require("./email.js");

var capitalize = function(word) {
  return word[0].toUpperCase() + word.substr(1,word.length);
};

var apiRoot = "/api/";

module.exports = function(app) {

  var makeReadApis = function(nouns) {
    _.each(nouns,function(n) {
      console.log("creating /api/"+n+" endpoint");
      app.get(apiRoot+n,function(req, res) {
        orm["get"+capitalize(n)](function(r) {
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

  app.post(apiRoot+'cart',function(req, res) {
    console.log(req.body);
    var obj = JSON.parse(req.body.model);
    var newusers = [];
    console.log("NEW CART",obj);
    /*
      email.sendMail(null, eml, req.body.host+" invited you to SharePay!", 
        req.body.host+" wants to split the bill with you on "+req.body.vendor+
        "\n\nAccess the SharePay: "+(uri+eml));
      */
    _.each(obj.emails,function(em) {
      orm.getOrCreateUser(em,function(newuser) {
        // TODO: hacky mchackathon
        newusers.push(newuser);
        if(newusers.length == obj.emails.length) {
          // now we've created users for everyone and can make the cart
          orm.makeCart(obj,function(cart) {
            // email template
            var tmplString = fs.readFile(__dirname + "/templates/email.erb.html","utf-8",function(err, str) {
              if(err) {
                throw err;
              }
              _.each(obj.emails,function(em) {
                var subject = obj.host.name + " invited you to SharePay!";
                var params = {
                  name: "Someone",
                  vendor: obj.vendor.name,
                  sp_link: "http://sharepay.herokuapp.com/#cart/"+cart._id+"/email/"+em
                };
                var body = _.template(str, params);
                email.sendMail(null, em, subject, body);
              }); // end each

              // finally send response
              res.set("Content-Type","application/json");
              res.set("Access-Control-Allow-Origin","*");
              res.send({
                success: true,
                cart: cart
              });
            }); // end readFile
          }); // end makeCart
        } // end if
      }); // end getOrCreateUser
    });
  });

  app.put(apiRoot+'cart/:id',function(req, res) {
    console.log(req.body);
    var id = req.params.id;
    var obj = JSON.parse(req.body.cart);
    console.log("UPDATING CART TO:",obj);
    orm.updateCart(id,obj,function(cart) {
      res.set("Content-Type","text/json");
      res.set("Access-Control-Allow-Origin","*");
      res.send({
        success: true,
        cart: cart
      });
    });
  });

  app.get(apiRoot+'cart/:id',function(req, res) {
    orm.getCart(req.params.id,function(cart) {
      console.log("GOT A CART",cart);
      res.set("Content-Type","text/json");
      res.set("Access-Control-Allow-Origin","*");
      res.send({
        success: true,
        id: req.params.id,
        cart: cart
      });
    });
  });

  app.get(apiRoot+'user',function(req, res) {
    res.set("Content-Type","text/json");
    res.set("Access-Control-Allow-Origin","*");
    var parts = url.parse(req.url, true);
    var query = parts.query;
    if(query.email) {
      orm.getOrCreateUser(query.email,function(user, newuser) {
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

  app.put(apiRoot+'user/:id',function(req, res) {
    var id = req.params.id;
    var obj = JSON.parse(req.body.user);
    console.log("UPDATING CART TO:",obj);
    orm.updateUser(id,obj,function(user) {
      res.set("Content-Type","text/json");
      res.set("Access-Control-Allow-Origin","*");
      res.send({
        success: true,
        user: user
      });
    });
  });

  app.post(apiRoot+'invite', function(req, res){
    console.log(req.body);
    var len = req.body.emails.length;
    var uri = req.body.url;
    for(var i = 0; i < len; i++){
      var eml = req.body.emails[i];
      console.log(eml);
      email.sendMail(null, eml, req.body.host+" invited you to SharePay!", 
        req.body.host+" wants to split the bill with you on "+req.body.vendor+
        "\n\nAccess the SharePay: "+(uri+eml));
    }
    res.end();
  });

  app.post(apiRoot+'user/token', function(req, res){
    var js = JSON.parse(req.body.data);
    console.log(js);
    orm.setUserToken(js.email, js.type, js.token);
    res.end();
  });

};
