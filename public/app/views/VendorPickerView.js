App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	var VendorPicker = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'vendor-container left',
		template: 'vendor',
		events:{
			'click img': 'updateVendor',
			'click .name': 'updateVendor'
		},
		updateVendor: function() {
			this.trigger('vendorselected', this.model);
		}
	});

	Mod.VendorPickerCollectionView = Marionette.CollectionView.extend({
		//tagName: 'section',
		//className: 'vendor',
		itemView: VendorPicker
	});
});