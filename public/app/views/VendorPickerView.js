App.module('Views', function(Mod, App, Backbone, Marionette, $, _) {

	var VendorPicker = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'vendorContainer',
		template: 'vendor',
		events: {
			'click img'   : 'updateVendor',
			'click .name' : 'updateVendor'
		},
		updateVendor: function() {
			this.trigger('vendorselected', this.model);
			this.$el.toggleClass('selected');
		}
	});

	Mod.VendorPickerCollectionView = Marionette.CollectionView.extend({
		itemView: VendorPicker
	});
});