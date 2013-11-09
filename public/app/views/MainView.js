App.Views.MainView = Backbone.View.extend({

	el: '#content',

	events: {
		'click .select-vendor': function() {
			console.log('selected a vendor');
			App.router.navigate('vendor/', {trigger: true});
		}
	},

	initialize: function(options) {
		var self = this;

		this.collection = new App.Collections.VendorCollection();

		_(this.collection.models).each(function(item) {
			self.renderVendor(item);
		}, this);

		this.render();
	},

	render: function() {
		var t = templateManager.getTemplate('main');
		this.$el.html(t);
		//this.songListView = new App.Views.SongListView();
		//this.songListView.render();
	},

	renderVendor: function() {
		this.append('<div></div>');
	}

});
