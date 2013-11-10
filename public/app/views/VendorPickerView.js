App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.VendorPickerView = Backbone.View.extend({

		tagName: 'section',

		className: 'vendor-list-container',

		initialize: function(options) {
			this.options = options;
			this.parentEl = this.options.parentView.$el;
		},

		// `render` renders the HTML container, `vendor-list-container`.
		render: function() {
			var that = this,
				templateFn = _.template(templateManager.getTemplate('vendors'));

			var html = templateFn({
				vendors: this.collection.models
			});

			this.parentEl.append(html);
		}

	});
});