// send-order

App = new Backbone.Marionette.Application();
$(function() {
  App.addRegions({
    content: '#content'
  });
  templateManager.loadTemplates();

  // TODO instantiate this properly, either based on url or login
  App.user = new App.Models.UserModel();

  var AppRouter = Backbone.Router.extend({

    routes: {
      'cart/:cartId/email/:userEmail' : 'cart',
      '*path'                         : 'defaultRoute'
    },

    cart: function(cartId, userEmail) {
      console.log('in cart: cartId', cartId, 'userEmail', userEmail);

      // TODO: use $.when
      App.user.set('currentUser', true);
      App.user.url = '/api/user?email=' + userEmail;
      App.user.fetch({success:function(){
        App.cart = new App.Models.CartModel();
        App.cart.url = '/api/cart/' + cartId;
        App.cart.fetch({success:function(){
          App.cart.groupItems();
          var cartView = new App.Views.CartView({model:App.cart});
          cartView.render();
        }});
      }});
    },

    defaultRoute: function(path) {
      if (path) {
        console.log('unkown path:', path);
      }
      App.content.show(new App.Views.MainView());
    }

  });
  
  var defaultTemplateLoadingMechanism = Marionette.TemplateCache.prototype.loadTemplate;
  Marionette.TemplateCache.prototype.loadTemplate = function(key){
    var template;
    if(key.indexOf('#') !== 0){
      template = templateManager.getTemplate(key);
    } else {
      template = defaultTemplateLoadingMechanism(val);
    }
    return template;
  };
  App.addInitializer(function(){
    App.router = new AppRouter();
    Backbone.history.start();
  });
  App.socket = io.connect();
  App.socket.on('connect',function() {
    App.socket.on('identify', function(data) {
      console.log("IDENTIFY",data.clientId);
      App.clientId = data.clientId;
      App.start();
    });
  });
});
