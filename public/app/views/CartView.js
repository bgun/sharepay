App.Views.CartView = Backbone.View.extend({

	el: '#content',

	events: {
		'click .add-shared-item-btn': 'addSharedItem',
		'click .dwolla-btn': 'makeDwollaPayment',
		'click .venmo-btn': 'makeVenmoPayment'
	},

	initialize: function(options) {
		var self = this;
		this.model = options.model;
		this.model.on('change', function(){
			self.render();
		});
	},

	render: function() {
		var self = this,
			COUNTDOWN_INTERVAL = 1000*1, // 1 min
			templateFn = _.template(templateManager.getTemplate('cart')),
			obj = this.model.toJSON(),
			html;

		obj.timeLeft = this.model.getTimeLeft();
		obj.sharedTotal = App.Utils.hashSum(this.model.get('groupedItems').shared, 'price');
		obj.sharedShare = (obj.sharedTotal / this.model.get('users').length).toFixed(2);
		html = templateFn(obj);
		this.$el.html(html);

		this.delegateEvents();

		this.intervalId = setInterval(function(){
			self.updateCountdown();
		}, COUNTDOWN_INTERVAL);
		return this;
	},

	addSharedItem: function(e) {
		var name = this.$el.find('.item-name-input').val(),
			price = this.$el.find('.item-price-input').val(),
			errors = [];

		e.preventDefault();
		if (!name) { errors.push('Item Name is required.'); }
		if (!price) { errors.push('Price is required.'); }
		if (!App.Utils.isNumber(price) && price > 0) { errors.push('Price must be a positive number.'); }
		if (errors.length) {
			toastr.error(errors.join('<br>'));
		} else {
			this.model.addItem({
				name: name,
				price: +price
			});
		}
	},

	updateCountdown: function() {
		this.$el.find('.time-left').html(this.model.getTimeLeft());
	},


	

	makeDwollaPayment: function() {
		console.log('dwolla!');
		window.addEventListener('message', function(event) {
			console.log('received response: ',event.data);
			var url = 'http://sharepay.herokuapp.com';
			$.ajax({
				type: 'POST',
				url: url + '/api/user/token',
				data: {
					"email": "test@test.com",
					"type" : "dwolla",
					"token" : event.data
				}
			});
		},false);
		window.open("https://www.dwolla.com/oauth/v2/authenticate?"+
			"redirect_uri="+encodeUriComponent("http://sharepay.herokuapp.com/auth/dwolla_callback")+
			"&client_id=hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo"+
			"&response_type=code&scope=send|request","_blank");
	},

	makeVenmoPayment: function() {

	}

});
