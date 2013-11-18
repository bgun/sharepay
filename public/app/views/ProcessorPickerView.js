App.module('Views', function(Mod, App, Backbone, Marionette, $, _) {

	var ProcessorPicker = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'processorContainer',
		template: 'processor',
		events: {
			'click img' : 'updateProcessor'
		},
		updateProcessor: function(evt) {
			if (this.model.get('selected')) {
				this.model.set('selected', false);
				this.$el.find('img').removeClass('selected');
			} else {
				this.model.set('selected', true);
				this.$el.find('img').addClass('selected');
			}
			this.trigger('processorSelected', this.model);
		}
	});

	Mod.ProcessorPickerCollectionView = Marionette.CollectionView.extend({
		itemView: ProcessorPicker
	});

});