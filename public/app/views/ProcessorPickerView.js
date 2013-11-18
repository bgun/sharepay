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
			this.$el.addClass('selected');
		}
	});

	Mod.ProcessorPickerCollectionView = Marionette.CollectionView.extend({
		itemView: ProcessorPicker
	});

});