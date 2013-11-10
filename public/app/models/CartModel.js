App.Models.CartModel = Backbone.Model.extend({
	defaults: {
		vendor: null,
		items: new Backbone.Collection(),
		users: new Backbone.Collection(),
		processors: new Backbone.Collection(),
		deadline: null,
	},
	initialize: function(options) {
		if (typeof options.deadline === 'string') {
			this.set('deadline', new Date(options.deadline));
		}
	}, 
	getTimeLeft: function() {
		var millis = this.get('deadline') - new Date(),
			friendly = moment(this.get('deadline')).fromNow();

		// console.log('cart time left', millis, friendly);
		return friendly;
	}
});
