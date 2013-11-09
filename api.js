var mongoose = require("mongoose");

mongoose.connect('mongodb://sharepay:456Fintech@paulo.mongohq.com:10085/app19320139');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database is available");
});

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


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


/* Cart */

var cartSchema = mongoose.Schema({
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
