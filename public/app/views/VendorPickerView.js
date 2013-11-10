App.Views.VendorPickerView = Backbone.View.extend({

	tagName: 'section',

	className: 'vendor-list-container',

	initialize: function(options) {
		this.options = options;
	},

	render: function() {
		var that = this,
			templateFn = _.template(templateManager.getTemplate('vendor'));

    	_.each(this.collection.models, function(vendorView) {
    		var obj = vendorView.toJSON(),
    			html = templateFn(obj);

			that.options.parentView.$el.append(html);
		});

		return this;
	}

});