App.module('Views', function(Mod, App, Backbone, Marionette, $, _) {
	var ProcessorPicker = Marionette.ItemView.extend({
		template: 'processor',
		events: {
			'click input':'updateProcessor',
			'click label':'updateProcessor'
		},
		updateProcessor:function(evt){
			var isChecked = this.$el.find('input').is(':checked');
			if (isChecked) {
				this.trigger('addprocessor', this.model);
			} else {
				this.trigger('removeprocessor', åthis.model);
			}
		}
	});
	Mod.ProcessorPickerCollectionView = Marionette.CollectionView.extend({
		tagName: 'section',
		itemView: ProcessorPicker
	});
});