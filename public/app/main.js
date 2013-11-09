var App = App || {
  Collections: {},
  Models: {},
  Views: {},
  Utils: {},
  settings: {

  }
};

// send-order

$(function() {

  templateManager.loadTemplates();
  // App.songs = new App.Collections.SongCollection();
  // App.song = new App.Models.SongModel(); // change this to load all the songs

  var AppRouter = Backbone.Router.extend({

    routes: {
      //'/vendors' : 'vendorRender',
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
      var myCart = new App.Models.CartModel({
        vendor: 'Seamless',
        items: new Backbone.Collection(),
        users: ['ben', 'greg', 'raj', 'pavel', 'micah', 'moshe'],
        processors: ['dowalla','venmo'],
        deadline: "2013-11-10T21:15:41.010Z",
      });
      var cartView = new App.Views.CartView({model:myCart});
      cartView.render();
    },

    defaultRoute: function(path) {
      console.log('main');
      if (path) {
        console.log('unkown path:', path);
      }
      App.main = new App.Views.MainView().render();
    }

  });

  App.router = new AppRouter();
  Backbone.history.start();

});
