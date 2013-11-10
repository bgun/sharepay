App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.MainView = Marionette.Layout.extend({
		template: 'main',
		regions: {
			vendors:'#vendorList',
			processors:'#processorList'
		},
		className: 'main-view',
		events: {
			'click .vendor': 'updateVendor'
		},
		onRender: function(options) {
			var that = this,
				vendorColl,
				processorColl;

			vendorColl = new App.Collections.VendorCollection();
			vendorColl.fetch().done(function(){
				that.vendors.show(new App.Views.VendorPickerCollectionView({
					collection: vendorColl
				}));
			});

			processorColl = new App.Collections.ProcessorCollection();
			processorColl.fetch().done(function(){
				that.processors.show(new App.Views.ProcessorPickerCollectionView({
					collection: processorColl
				}));
			});
		},
		updateVendor: function(evt) {
			console.log(evt);
		}
	});
});
