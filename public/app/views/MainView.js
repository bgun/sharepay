App.Views.MainView = Backbone.View.extend({

	el: '#content',

	viewsToRender: [
		//new App.Views.VendorPickerView({ collection: App.vendors })
	],

	events: {
		'click .invite-funders': 'sendInvites'
	},

	initialize: function(options) {
		var self = this;
		var viewsToRender = [];

		var what = new App.Views.VendorPickerView({ collection: App.vendors });

		viewsToRender.push(what); 

		_(viewsToRender).each(function(view) {
			view.render();
		}, this);

		this.render();
	},

	render: function() {
		var t = templateManager.getTemplate('main');
		this.$el.html(t);
	},

	sendInvites: function() {
		
	}

});
