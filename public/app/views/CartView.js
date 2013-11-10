App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.CartView = Backbone.View.extend({

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
			// for oAuth
			window.addEventListener('message', function(event) {
				console.log('received response: ',event.data);
				var url = 'http://sharepay.herokuapp.com';
				$.ajax({
					type: 'POST',
					url: url + '/api/user/token',
					processData: false,
					data: JSON.stringify({
						email: App.user.get('email'),
						type : event.data.type,
						token : event.data.token
					})
				});
				var tokens = App.user.get('tokens');
				tokens = tokens || {};
				tokens[event.data.type] = event.data.token;
				App.user.set('tokens', tokens);
				if(event.data.type == "dwolla"){
					makeDwollaPayment();
				} else if(event.data.type == "venmo"){
					makeVenmoPayment();
				}
			},false);
			
		},

		render: function() {
			var self = this,
				COUNTDOWN_INTERVAL = 1000*1, // 1 min
				templateFn = _.template(templateManager.getTemplate('cart')),
				obj = this.model.toJSON(),
				html;

			obj.timeLeft = this.model.getTimeLeft();
			obj.sharedTotal = App.Utils.hashSum(this.model.get('groupedItems').shared, 'price');
			obj.sharedShare = obj.sharedTotal / this.model.get('users').length;
			obj.currentUserId = App.user.get('_id');
			obj.isHost = App.user.get('isHost');
			html = templateFn(obj);
			this.$el.html(html);

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
			var tokens = App.user.get('tokens') || {};
			if(typeof tokens.dwolla != "undefined"){
				// make dwolla payment here
				console.log("make dwolla payment here... token "+tokens.dwolla);
			} else {
				window.open("https://www.dwolla.com/oauth/v2/authenticate"+
					"?redirect_uri="+encodeURIComponent("http://sharepay.herokuapp.com/auth/dwolla_callback")+
					"&client_id=hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo"+
					"&response_type=code&scope=send%7Crequest","_blank");
			}
		},

		makeVenmoPayment: function() {
			console.log('venmo!...?');
		}
	});
});
