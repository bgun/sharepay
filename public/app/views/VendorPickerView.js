App.Views.VendorPickerView = Backbone.View.extend({

	tagName: 'section',

	className: 'vendor-list-container',

	initialize: function(options) {
		this.options = options;
	},

	render: function() {
		var templateFn = _.template(templateManager.getTemplate('vendor')),
			obj = this.model.toJSON(),
			html = templateFn(obj);

		this.$el.html(html);
		this.options.parentView.$el.append(this.$el);
		return this;
	}

});