App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.MainView = Backbone.View.extend({

		id: 'content',

		className: 'main-view',

		events: {
			'click .invite-btn': 'sendInvites'
		},

		initialize: function(options) {
			var that = this,
				url = 'http://sharepay.herokuapp.com',
				vendorAjax = $.ajax({
					type: 'GET',
					url: url + '/api/vendors'
				}),
				processorAjax = $.ajax({
					type: 'GET',
					url: url + '/api/processors'
				});

			this.childViews = [];
			$.when(vendorAjax, processorAjax).done(function(vendors, processors) {
				that.childViews.push(new App.Views.VendorPickerView({
					parentView: that,
					collection: new App.Collections.VendorCollection( vendors[0].vendors )
				}));
				that.childViews.push(new App.Views.ProcessorsPickerView({
					parentView: that,
					collection: new App.Collections.ProcessorCollection( processors[0].processors )
				}));
				renderCb(that.childViews);
			});
		},

		render: function(childViews) {
			_.each(childViews, function(view) {
				view.render();
			});
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
