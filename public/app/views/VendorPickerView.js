App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	var VendorPicker = Marionette.ItemView.extend({
		template: 'vendor'
	});
	Mod.VendorPickerCollectionView = Marionette.CollectionView.extend({
		tagName: 'section',
		className: 'vendor',
		itemView: VendorPicker
	});
});