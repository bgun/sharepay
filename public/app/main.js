// send-order

App = new Backbone.Marionette.Application();
$(function() {

  templateManager.loadTemplates();
  // App.songs = new App.Collections.SongCollection();
  // App.song = new App.Models.SongModel(); // change this to load all the songs

  // TODO instantiate this properly, either based on url or login
  App.user = new App.Models.UserModel();

  var AppRouter = Backbone.Router.extend({

    routes: {
      'cart/:cartId'     : 'cart',
      '*path'    : 'defaultRoute'
    },

    // createSong: App.SongViewController.createSong,
    // songLanding: App.SongViewController.showSongLandingView,
    // songListen: App.SongViewController.showSongListenView,
    // track: App.TrackViewController.showTrackView,

    // conductor: function(songId) {
    //   console.log('conductor', songId);
    // },

    cart: function(cartId) {
      console.log('in cart', cartId);
      // TODO: lookup cart from db
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
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('items:add', { my: 'data' });
  });
  Backbone.Mediator.sub("model:item-add",function(data) {
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  });
});
