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
		obj.remainingTime = moment(this.model.get('deadline')).fromNow();
		var html = templateFn(obj);
		this.$el.html(html);
		return this;
	},


	

	makeVenmoPayment: function() {
		console.log('venmo!');
		window.open("https://www.dwolla.com/oauth/v2/authenticate?client_id="+
			"hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo&response_type=code&scope=send|request","_blank");
	}

});
