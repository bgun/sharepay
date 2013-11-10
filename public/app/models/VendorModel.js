App.module("Models", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.VendorModel = Backbone.Model.extend({
		defaults: {
			name: null,
			logoUrl: null,
			logoImgPath: null,
			vendorUrl: null,
			optionsView: null
		}
	});
});