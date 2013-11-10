App.module("Models", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.CartModel = Backbone.Model.extend({
		defaults: {
			vendor: null,
			items: [],
			groupedItems: [],
			users: [],
			processors: [],
			deadline: null,
		},
		parse: function(r) {
			return r.cart;
		},
		initialize: function(options) {
			if (options && typeof options.deadline === 'string') {
				this.set('deadline', new Date(options.deadline));
			}
			if (options && options.items && options.items.length) {
				this.groupItems();
			}
		},
		getTimeLeft: function() {
			var millis = this.get('deadline') - new Date(),
				friendly = moment(this.get('deadline')).fromNow();
			return friendly;
		},
		groupItems: function() {
			var grouped = _(this.get('items')).groupBy(function(item){
				var result = item.user || 'shared';
				return result;
			});
			_(grouped).each(function(group, key){
				grouped[key].totalCost = App.Utils.hashSum(group, 'price');
			});
			this.set('groupedItems', grouped);
		},
		addItem: function(item) {
			this.get('items').push(item);
			this.groupItems();
			this.trigger('change');
			Backbone.Mediator.pub("cart:item-add",{
				cartId: this.get('_id'),
				item: item
			});
		}
  });
});
