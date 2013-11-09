App.Views.VendorPickerView = Backbone.View.extend({

	tagName: 'section',

	className: 'vendor-list-container',

	initialize: function(options) {
		this.options = options;
	},

	render: function() {
		var html = this.options.collection.pluck('name').join(', ');
		this.$el.html(html);
		this.options.parentView.$el.append(this.$el);
	}

});