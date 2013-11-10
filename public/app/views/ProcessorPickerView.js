App.Views.ProcessorsPickerView = Backbone.View.extend({

	tagName: 'section',

	className: 'payment-options',

	initialize: function(options) {
		this.options = options;
	},

	render: function() {
		var that = this,
			templateFn = _.template(templateManager.getTemplate('vendor'));

    	_.each(this.collection.models, function(processorView) {
    		var obj = processorView.toJSON(),
    			html = templateFn(obj);

			that.options.parentView.$el.append(html);
		});

		return this;
	}

});