App.Views.VendorPickerView = Backbone.View.extend({

	tagName: 'section',

	className: 'vendor-list-container',

	events: {
		'click .vendor-container': 'updateVendor'
	},

	initialize: function(options) {
		this.options = options;
		this.parentEl = this.options.parentView.$el;
	},

	render: function() {
		var html,
			that = this,
			templateFn = _.template(templateManager.getTemplate('vendors'));

		html = templateFn({
			vendors: this.collection.models
		});

		this.$el.html(html);
		this.parentEl.html(this.$el);
	},

	updateVendor: function(evt) {
		$(evt.currentTarget).toggleClass('selected');
	}

});