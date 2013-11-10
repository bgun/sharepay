App.Models.CartModel = Backbone.Model.extend({
	defaults: {
		vendor: null,
		sharedItems: [],
		users: [],
		processors: [],
		deadline: null,
	},
	initialize: function(options) {
		if (typeof options.deadline === 'string') {
			this.set('deadline', new Date(options.deadline));
		}
		if (options.items && options.items.length) {
			var shared = _(options.items).filter(function(item) {
				return !item.user;
			});
			this.set('sharedItems', shared);
		}
	}, 
	getTimeLeft: function() {
		var millis = this.get('deadline') - new Date(),
			friendly = moment(this.get('deadline')).fromNow();

		// console.log('cart time left', millis, friendly);
		return friendly;
	}
});
