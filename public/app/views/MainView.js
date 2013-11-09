App.Views.MainView = Backbone.View.extend({

	el: '#content',

	events: {
		'click .invite-funders': 'sendInvites'
	},

	initialize: function(options) {
		var _this = this;

		this.childViews = {};
		this.vendorPicker = new App.Views.VendorPickerView({ collection: App.vendors });
		this.childViews[this.vendorPicker.cid] = this.vendorPicker;

		_.each(this.childViews, function(view, cid){
			this.$('[data-view-cid="' + cid + '"]').replaceWith(view.el);
		});

		this.render();
	},

	render: function() {
		var t = templateManager.getTemplate('main');
		this.$el.html(t);
	},

	sendInvites: function() {
		
	}

});
