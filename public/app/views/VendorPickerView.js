App.module('Views', function(Mod, App, Backbone, Marionette, $, _) {

	var VendorPicker = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'vendorContainer',
		template: 'vendor',
		events: {
			'click img' : 'updateVendor'
		},
		updateVendor: function() {
			if (this.model.get('selected')) {
				this.model.set('selected', false);
			} else {
				this.model.set('selected', true);
			}

			// Trigger this event _after_ updating model.
			this.trigger('vendorSelected', this.model);

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