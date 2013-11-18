App.module("Models", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.ProcessorModel = Backbone.Model.extend({
		defaults: {
			name: null,
			logoUrl: null
		}
	});
});