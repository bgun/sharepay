App.module('Views', function(Mod, App, Backbone, Marionette, $, _) {

	var ProcessorPicker = Marionette.ItemView.extend({
		tagName: 'div',
		className: 'processorContainer',
		template: 'processor',
		events: {
			'click input' : 'updateProcessor',
			'click label' : 'updateProcessor'
		},
		updateProcessor: function(evt) {
			this.trigger('processorselected', this.model);
			this.$el.toggleClass('selected');
		}
	});
	Mod.ProcessorPickerCollectionView = Marionette.CollectionView.extend({
		itemView: ProcessorPicker
	});
});