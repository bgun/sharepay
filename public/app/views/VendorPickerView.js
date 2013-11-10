App.Views.VendorPickerView = Backbone.View.extend({

	tagName: 'section',

	className: 'vendor-list-container',

	initialize: function(options) {
		this.options = options;
		this.parentEl = this.options.parentView.$el;
	},

	// `render` renders the HTML container, `vendor-list-container`.
	render: function() {
		var that = this,
			templateFn = _.template(templateManager.getTemplate('vendors'));

		var html = templateFn({
			vendors: this.collection.models
		});

		this.parentEl.append(html);
	},

	// `renderVendors` renders the individual models in the collection.
	renderVendors: function() {
		/*var that = this,
			templateFn = _.template(templateManager.getTemplate('vendor'));

		_.each(this.collection.models, function(vendorView) {
			var obj = vendorView.toJSON(),
				html = templateFn(obj);

			that.parentEl.append(html);
		});*/
	}

});