App.Views.ProcessorsPickerView = Backbone.View.extend({

	tagName: 'section',

	className: 'payment-options',

	initialize: function(options) {
		this.options = options;
	},

	render: function() {
		var processors = this.options.collection.pluck('name'); //.join(', ');
		console.log(processors);
		//this.$el.html(html);
		//this.options.parentView.$el.append(this.$el);
	}

});