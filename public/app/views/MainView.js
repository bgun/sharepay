App.Views.MainView = Backbone.View.extend({

	id: 'content',

	className: 'main-view',

	events: {
		'click .invite-btn': 'sendInvites',
		'click .vendor-container': 'updateVendor'
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
			that.render();
		});
	},

	render: function() {
		_.each(this.childViews, function(view) {
			view.render();
		});
	},

	sendInvites: function() {
		alert('send invites');
	}

});
