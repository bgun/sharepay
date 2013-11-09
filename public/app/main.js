var App = App || {
  Collections: {},
  Models: {},
  Views: {},
  Utils: {},
  songs: {},
  settings: {
    GRID_SIZE: 16,
    DEFAULT_BPM: 100,
    MAX_SELECTIONS_PER_TRACK: 16
  }
};

$(function() {
  templateManager.loadTemplates();
  // App.songs = new App.Collections.SongCollection();
  // App.song = new App.Models.SongModel(); // change this to load all the songs

  var AppRouter = Backbone.Router.extend({

    routes: {
      "song/create"             : "createSong",
      "song/:song"              : "songLanding",
      "song/:song/listen"       : "songListen",
      "song/:song/track"        : "track",
      // "song/:song/conductor"    : "conductor",
      // "song/conductor"          : "conductor",
      "*path"                   : "defaultRoute"
    },

    // createSong: App.SongViewController.createSong,
    // songLanding: App.SongViewController.showSongLandingView,
    // songListen: App.SongViewController.showSongListenView,
    // track: App.TrackViewController.showTrackView,

    // conductor: function(songId) {
    //   console.log('conductor', songId);
    // },

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
