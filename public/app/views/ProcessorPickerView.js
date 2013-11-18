App.module('Views', function(Mod, App, Backbone, Marionette, $, _) {

	var ProcessorPicker = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'processorContainer',
		template: 'processor',
		events: {
			'click img' : 'updateProcessor'
		},
		updateProcessor: function(evt) {
			this.trigger('processorSelected', this.model);

			// Update `selected` attribute
			if (this.model.get('selected')) {
				this.model.set('selected', false);
			} else {
				this.model.set('selected', true);
			}

			// Render processor
			if (this.model.get('selected')) {
				this.$el.find('img').addClass('selected');
			} else {
				this.$el.find('img').removeClass('selected');
			}

		}
	});

	Mod.ProcessorPickerCollectionView = Marionette.CollectionView.extend({
		itemView: ProcessorPicker
	});

});