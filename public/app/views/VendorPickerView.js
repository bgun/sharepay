App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.VendorPickerView = Backbone.View.extend({

		tagName: 'section',

		className: 'vendor-list-container',

		initialize: function(options) {
			this.options = options;
			this.parentEl = this.options.parentView.$el;
		},

		render: function() {
			var html,
				that = this,
				templateFn = _.template(templateManager.getTemplate('vendors'));

			_.each(this.collection.models, function(vendor) {
				var v = new App.Views.VendorView({
					model: vendor,
					parentView: that
				});
				var html = v.render();
				that.$el.append(html);
			});

			//this.$el.html(html);
			//this.parentEl.html(this.$el);
		}

	});
});