App.Views.VendorPickerView = Backbone.View.extend({

	el: '.vendor-list-container',

	render: function() {
		var html = this.options.collection.pluck('name').join(', ');
		console.log(html)
		this.$el.html(html);
	}
});