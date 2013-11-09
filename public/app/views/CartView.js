App.Views.CartView = Backbone.View.extend({

	el: '#content',

	events: {
		'click .venmo-btn': 'makeVenmoPayment'
	},

	// initialize: function(options) {
	// },

	render: function() {

		var templateFn = _.template(templateManager.getTemplate('cart'));
		var obj = this.model.toJSON();
		obj.remainingTime = this.model.get('deadline') - new Date();
		var html = templateFn(obj);
		this.$el.html(html);
		return this;
	},




	makeVenmoPayment: function() {
		console.log('venmo!');
	}

});
