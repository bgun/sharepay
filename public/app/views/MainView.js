App.Views.MainView = Backbone.View.extend({

	el: "#content",

	events: {
		'click .create-song': function() {
			console.log('create a song');
			App.router.navigate('song/create', {trigger: true});
		}
	},

	initialize: function(options) {
	},

	render: function() {
		var t = templateManager.getTemplate('main');
		this.$el.html(t);
		// this.songListView = new App.Views.SongListView();
		// this.songListView.render();
	},

});
