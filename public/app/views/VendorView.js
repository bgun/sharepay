App.Views.VendorView = Backbone.View.extend({

	tagName: 'div',

	className: 'vendor-container',

	initialize: function(options) {
		this.options = options;
		this.parentEl = this.options.parentView.$el;
	},

	render: function() {
		var html,
			that = this,
			templateFn = _.template(templateManager.getTemplate('vendor'));

		html = templateFn({
			vendor: that.model
		});

		var result = this.$el.html(html);
		return result.html();
	}

});