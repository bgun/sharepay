App.Views.MainView = Backbone.View.extend({

	el: '#content',

	events: {
		'click .submit-funders': 'renderVendors'/*,
		'click .send-order': function() {
			console.log('sending an order');
			App.router.navigate('');
		}*/
	},

	initialize: function(options) {
		var self = this;

		/*this.collection = new App.Collections.VendorCollection();

		_(this.collection.models).each(function(item) {
			self.renderVendor(item);
		}, this);*/

		this.render();
	},

	render: function() {
		var t = templateManager.getTemplate('main');
		this.$el.html(t);
		//this.songListView = new App.Views.SongListView();
		//this.songListView.render();
	},

	renderVendors: function() {
		var vendors = new App.Collection.VendorCollection();

		_(this.collection.models).each(function(item) {
			self.renderVendor(item);
		}, this);
		//this.$el.find('.vendor-list-container').show();
	}

});
