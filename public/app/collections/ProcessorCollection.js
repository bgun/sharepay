App.module("Collections", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.ProcessorCollection = Backbone.Collection.extend({
		model: App.Models.ProcessorModel
	});
});
