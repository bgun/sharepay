App.Models.VendorModel = Backbone.Model.extend({
	
	defaults: {
		name: null,
		logoUrl: '',
		logoImgPath: null,
		baseVendorUrl: new Backbone.Collection()
	},
	
	initialize: function(options) {
	
	}

});