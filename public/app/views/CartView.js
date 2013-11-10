App.Views.CartView = Backbone.View.extend({

	el: '#content',

	events: {
		'click .venmo-btn': 'makeVenmoPayment'
	},

	// initialize: function(options) {
	// },

	render: function() {
		var self = this,
			COUNTDOWN_INTERVAL = 1000*1, // 1 min
			templateFn = _.template(templateManager.getTemplate('cart')),
			obj = this.model.toJSON(),
			html;

		obj.timeLeft = this.model.getTimeLeft();
		html = templateFn(obj);
		this.$el.html(html);
		this.intervalId = setInterval(function(){
			self.updateCountdown();
		}, COUNTDOWN_INTERVAL);
		return this;
	},

	updateCountdown: function() {
		this.$el.find('.time-left').html(this.model.getTimeLeft());
	},


	

	makeVenmoPayment: function() {
		console.log('venmo!');
		window.open("https://www.dwolla.com/oauth/v2/authenticate?client_id="+
			"hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo&response_type=code&scope=send|request","_blank");
	}

});
