// send-order

App = new Backbone.Marionette.Application();
$(function() {

  templateManager.loadTemplates();

  // TODO instantiate this properly, either based on url or login
  App.user = new App.Models.UserModel();

  var AppRouter = Backbone.Router.extend({

    routes: {
      'cart/:cartId'                : 'cart',
      'cart/:cartId/email/:userEmail' : 'cart',
      '*path'                       : 'defaultRoute'
    },

    cart: function(cartId, userEmail) {
      console.log('in cart: cartId', cartId, 'userEmail', userEmail);

      // TODO: use $.when
      App.user.set('currentUser', true);
      App.user.url = 'http://sharepay.herokuapp.com/api/user?email=' + userEmail;
      App.user.fetch({success:function(){
        App.cart = new App.Models.CartModel();
        App.cart.url = 'http://sharepay.herokuapp.com/api/cart/' + cartId;
        App.cart.fetch({success:function(){
          var cartView = new App.Views.CartView({model:App.cart});
          cartView.render();
        }});
      }});
    },

    defaultRoute: function(path) {
      if (path) {
        console.log('unkown path:', path);
      }
      App.main = new App.Views.MainView({ el: '#content' });
    }

  });
  
  var defaultTemplateLoadingMechanism = Marionette.TemplateCache.prototype.loadTemplate;
  Marionette.TemplateCache.prototype.loadTemplate = function(key){
    var template;
    if(key.indexOf('#') !== 0){
      template = getTemplates[key];
    } else {
      template = defaultTemplateLoadingMechanism(val);
    }
    return template;
  };
  App.addInitializer(function(){
    App.router = new AppRouter();
    Backbone.history.start();
  });
  App.start();

  var socket = io.connect();
  socket.on('identify', function(data) {
    console.log(data);
    App.client_id = data.client_id;
  });
  Backbone.Mediator.sub("cart:item-add",function(cartItem) {
    socket.emit('cart:item-add',cartItem);
  });
});
