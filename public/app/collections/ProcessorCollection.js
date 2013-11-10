App.module("Collections", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.ProcessorCollection = Backbone.Collection.extend({
		model: App.Models.ProcessorModel,
		url: 'http://sharepay.herokuapp.com/api/processors',
		parse: function(json) {
			return json.processors;
		}
	});
});