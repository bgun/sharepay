var App = App || {
  Collections: {},
  Models: {},
  Views: {},
  Utils: {},
  settings: {

  }
};

$(function() {

  templateManager.loadTemplates();

  var AppRouter = Backbone.Router.extend({

    routes: {
      //'/vendors' : 'vendorRender',
      'cart/:cartId'     : 'cart',
      '*path'    : 'defaultRoute'
    },

    cart: function(cartId) {
      console.log('in cart', cartId);
      // TODO: lookup cart from db (or use the just created one?)
      var d = new Date();
      d.setTime(d.getTime() + (8 * 60 * 1000)); // for testing, set the deadline to 8 mins from now
      App.cart = new App.Models.CartModel({
        vendor: 'Seamless',
        items: [
          {
            name: 'Couch',
            price: 1200
          }, {
            name: 'Frying pan',
            price: 35
          }, {
            name: 'Thing',
            price: 123,
            user: 'ben'
          }
        ],
        users: ['ben', 'greg'],
        processors: ['dowalla','venmo'],
        deadline: d.toJSON(),
      });
      var cartView = new App.Views.CartView({model:App.cart});
      cartView.render();
    },

    defaultRoute: function(path) {
      if (path) {
        console.log('unkown path:', path);
      }
      App.main = new App.Views.MainView({ el: '#content' });
    }

  });

  App.router = new AppRouter();
  Backbone.history.start();

});
