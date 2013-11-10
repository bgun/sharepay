var mongoose = require("mongoose");
var _        = require("underscore");

mongoose.connect('mongodb://sharepay:456Fintech@paulo.mongohq.com:10085/app19320139');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database is available");
});

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


/* User */

var userSchema = new Schema({
  name: String,
  email: String,
  tokens: {
    venmo: String,
    dwolla: String
  }
});
var User = mongoose.model('User', userSchema);
exports.getUsers = function(callback) {
  User.find(function(err, users) {
    callback.call(null, users);
  });
};
exports.getOrCreateUser = function(eaddr,callback) {
  User.findOne({email: eaddr}, function(err, user) {
    if(user) {
      console.log("FOUND USER",user);
      callback.call(null,user);
    } else {
      var u = new User({
        name: "",
        email: eaddr
      });
      console.log("NEW USER",u);
      u.save(function(err, newuser) {
        callback.call(null, newuser, true);
      });
    }
  });
};


/* Item */
var itemSchema = Schema({
  name: String,
  price: Number,
  user: String
});
var Item = mongoose.model('Item', itemSchema);


/* Cart */

var cartSchema = Schema({
  deadline: String,
  vendor: String,
  items: [Item]
});
var Cart = mongoose.model('Cart', cartSchema);
exports.makeCart = function(obj, callback) {
  var cart = new Cart(obj);
  cart.save(function(err, cart) {
    callback.call(null, cart);
  });
};
exports.updateCart = function(id, obj, callback) {
  var _id = mongoose.Types.ObjectId(id);
  console.log("Updating cart:",obj);
  Cart.update({_id:_id},_.omit(obj,"_id"),function(err, cart) {
    if(err) {
      console.log(err);
    }
    console.log("Updated cart:"+cart);
    callback.call(null, obj);
  });
};
exports.getCart = function(id,callback) {
  console.log("getCart id: ",id);
  var _id = mongoose.Types.ObjectId(id);
  Cart.findById(id,function(err, cart) {
    console.log(err, cart);
    callback.call(null, cart);
  });
};


/* Processor */

var processorSchema = new Schema({
  name: String
});
var Processor = mongoose.model('Processor', processorSchema);
exports.getProcessors = function(callback) {
  Processor.find(function(err, procs) {
    callback.call(null, procs);
  });
};


exports.setUserToken = function(eaddr, type, token) {
  var dat =  {
    type: token
  };
  console.log(eaddr);
  console.log({"tokens": dat});
  
  User.update({email: "test@test.com"}, {"tokens": dat}, function(err, r) {
    console.log(err);
    console.log("Updated user: "+r);
  });
};

/* Vendor */

var vendorSchema = new Schema({
  name: String,
  logoCode: String,
  vendorUrl: String
});
var Vendor = mongoose.model('Vendor', vendorSchema);
exports.getVendors = function(callback) {
  Vendor.find(function(err, vendors) {
    callback.call(null, vendors);
  });
};
