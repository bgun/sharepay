App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.MainView = Marionette.Layout.extend({
		template: 'main',
		regions: {
			vendors:'#vendorList',
			processors:'#processorList'
		},
		className: 'main-view',
		events: {
			'click .invite-btn': 'sendInvites'
		},
		onRender: function(options) {
			var that = this;

			var vendorsColl = new App.Collections.VendorCollection();
			vendorsColl.fetch().done(function(){
				that.vendors.show(new App.Views.VendorPickerCollectionView({
					collection: vendorsColl
				}));
			});

			var processorsColl = new App.Collections.ProcessorCollection();
			processorsColl.fetch().done(function(){
				that.processors.show(new App.Views.ProcessorPickerCollectionView({
					collection: processorsColl
				}));
			});

			//$.when(vendorAjax/*, processorAjax*/).done(function(vendors/*, processors*/) {
			//	 console.log(vendors.vendors);
				//this.vendors.show(new App.Views.VendorPickerCollectionView({
				//	collection: new App.Collections.VendorCollection( vendors[0].vendors )
				//}));
			//	this.processors.show(new App.Views.ProcessorsPickerView({
			//		collection: new App.Collections.ProcessorCollection( processors[0].processors )
			//	}));
			//});
		},
		sendInvites: function() {
			alert('send invites');
		},

		updateVendor: function(evt) {
			var vendorId = $(evt.target);


	            //cell = this.model.cells.get(cellId);
			console.log(vendorId);
			$(evt.currentTarget).toggleClass('selected');
			this.cart.set({
				//vendor: evt
			});
		}


	});
});
