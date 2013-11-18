App.module('Views', function(Mod, App, Backbone, Marionette, $, _) {

	var VendorPicker = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'vendorContainer',
		template: 'vendor',
		events: {
			'click img' : 'updateVendor'
		},
		updateVendor: function() {
			this.trigger('vendorSelected', this.model);

			// Update `selected` attribute
			if (this.model.get('selected')) {
				this.model.set('selected', false);
			} else {
				this.model.set('selected', true);
			}

			// Render vendor
			$('.vendorContainer').find('img').removeClass('selected');
			if (this.model.get('selected')) {
				this.$el.find('img').addClass('selected');
			}
		}
	});

	Mod.VendorPickerCollectionView = Marionette.CollectionView.extend({
		itemView: VendorPicker
	});

});