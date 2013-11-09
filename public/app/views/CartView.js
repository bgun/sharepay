App.Views.CartView = Backbone.View.extend({

	el: '#content',

	events: {
		'click .invite-funders': 'sendInvites'
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




		// var t = templateManager.getTemplate('cart');
		// var tfn = _.template(t);
	},

	sendInvites: function() {
		
	}

});
