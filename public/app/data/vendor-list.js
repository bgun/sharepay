
App.vendors = new App.Collections.VendorCollection([
	{
		name: 'Amazon',
		logoCode: 'amazon'
	},
	{
		name: 'Seamless',
		logoCode: 'seamless',
		optionsModel: App.Models.SeamlessOptionsModel,
		optionsView: App.Models.SeamlessOptionsView
	},
	{
		name: 'Fresh Direct',
		logoCode: 'freshdirect',
		optionsModel: App.Models.SeamlessOptionsModel,
		optionsView: App.Models.SeamlessOptionsView
	}
]);