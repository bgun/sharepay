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
			this.groupItems();
		}
	}, 
	getTimeLeft: function() {
		var millis = this.get('deadline') - new Date(),
			friendly = moment(this.get('deadline')).fromNow();

		// console.log('cart time left', millis, friendly);
		return friendly;
	},
	groupItems: function() {
		var grouped = _(this.get('items')).groupBy(function(item){ return item.user || 'shared'; });
		this.set('groupedItems', grouped);
	},
	addItem: function(item) {
		this.get('items').push(item);
		this.groupItems();
		this.trigger('change');
	}
});
