App.module("Models", function(Mod, App, Backbone, Marionette, $, _) {
  Mod.CartModel = Backbone.Model.extend({
    defaults: {
      vendor: null,
      groupedItems: [],
      users: [],
      processors: [],
      deadline: null,
    },
    initialize: function(options) {
      var that = this;
      if (options && typeof options.deadline === 'string') {
        this.set('deadline', new Date(options.deadline));
      }
      if (options && options.items && options.items.length) {
        this.groupItems();
      }
      App.socket.on('cart:item-add',function(cartItem) {
        if(cartItem.clientId !== App.clientId) {
          that.addItem(cartItem.item);
        }
      });
    }, 
    parse: function(r) {
      return r.cart;
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
      App.socket.emit('cart:item-add',{
        cartId: this.get('_id'),
        clientId: App.clientId,
        item: item
      });
    }
  });
});
