App.module("Models", function(Mod, App, Backbone, Marionette, $, _) {
  Mod.CartModel = Backbone.Model.extend({
		defaults: {
			vendor: null,
			items: [],
			groupedItems: [],
			users: [],
			processors: new App.Collections.ProcessorCollection(),
			deadline: null,
		},
		url:'/api/cart',
    parse: function(r) {
      return r.cart;
    },
    initialize: function(options) {
      var that = this;
      if (options && typeof options.deadline === 'string') {
        this.set('deadline', new Date(options.deadline));
      }
      if (options && options.items && options.items.length) {
        this.groupItems();
      }
      App.socket.on('db:item-added',function(cartItem) {
        console.log("FINGERPRINTS",cartItem.fingerprints);
        if(!_.contains(cartItem.fingerprints, App.clientId)) {
          that.addItem(cartItem.item, cartItem);
        }
      });
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
    addItem: function(item, cartItem) {
      this.get('items').push(item);
      this.groupItems();
      this.trigger('change');
      console.log("Adding item: ",item);
      App.socket.emit('cart:item-add',{
        cartId: this.get('_id'),
        fingerprints: cartItem ? _.union(cartItem.fingerprints,App.clientId) : [App.clientId],
        item: item
      });
    }
  });
});
