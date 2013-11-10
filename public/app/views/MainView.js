App.Views.MainView = Backbone.View.extend({

	id: 'content',

	className: 'main-view',

	events: {
		'click .invite-btn': 'sendInvites'
	},

	initialize: function(options) {
		this.childViews = [];
		this.childViews.push(new App.Views.VendorPickerView({
			model: new App.Models.VendorModel({
				name: 'Seamless',
				logoUrl: 'http://www.seamless.com/',
				logoImgPath: 'http://www.seamless.com/img/logo.png?3d8fd5'
			}),
			parentView: this,
			collection: App.vendors
		}));
		this.childViews.push(new App.Views.ProcessorsPickerView({
			model: new App.Models.ProcessorModel(),
			parentView: this,
			collection: App.processors
		}));
	},

	render: function() {
		//var t = templateManager.getTemplate('main');
		//this.$el.html(t);

		_.each(this.childViews, function(view) {
			view.render();
		});
	},

	sendInvites: function() {
		alert('send invites');
	}

});
