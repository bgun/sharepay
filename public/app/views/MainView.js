App.Views.MainView = Backbone.View.extend({

	id: 'content',

	className: 'main-view',

	events: {
		'click .invite-btn': 'sendInvites'
	},

	initialize: function(options) {
		var url = 'http://sharepay.herokuapp.com';

		var vendorAjax = $.ajax({
			url: url + '/api/vendors'
		});
		
		var processorAjax = $.ajax({
			url: url + '/api/processors'
		});

		$.when(vendorAjax, processorAjax).done(function(vendors, processors) {
			console.log(vendors, processors);
			this.childViews = [];
			this.childViews.push(new App.Views.VendorPickerView({
				parentView: this,
				collection: vendors
			}));
			this.childViews.push(new App.Views.ProcessorsPickerView({
				parentView: this,
				collection: processors
			}));
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
