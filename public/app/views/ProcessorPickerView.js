App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	var ProcessorPicker = Marionette.ItemView.extend({
		template: 'processor'
	});
	Mod.ProcessorPickerCollectionView = Marionette.CollectionView.extend({
		tagName: 'section',
		itemView: ProcessorPicker
	});
});