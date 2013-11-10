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


/* Cart */

var cartSchema = Schema({
  _id: Schema.ObjectId,
  deadline: String,
  vendor: String,
  items: Array
});
var Cart = mongoose.model('Cart', cartSchema);
exports.makeCart = function(obj, callback) {
  var cart = new Cart(obj);
  cart.save(function(err, cart) {
    callback.call(null, cart);
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
  _id: Schema.ObjectId,
  name: String
});
var Processor = mongoose.model('Processor', processorSchema);
exports.getProcessors = function(callback) {
  Processor.find(function(err, procs) {
    callback.call(null, procs);
  });
};


/* User */

var userSchema = new Schema({
  name: String,
  email: String
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


/* Vendor */

var vendorSchema = new Schema({
  _id: Schema.ObjectId,
  name: String
});
var Vendor = mongoose.model('Vendor', vendorSchema);
exports.getVendors = function(callback) {
  Vendor.find(function(err, vendors) {
    callback.call(null, vendors);
  });
};
