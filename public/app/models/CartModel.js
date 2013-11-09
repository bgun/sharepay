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
	}
});
