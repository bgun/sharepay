App.module("Collections", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.VendorCollection = Backbone.Collection.extend({
		model: App.Models.VendorModel
	});
});