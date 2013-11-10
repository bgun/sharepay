App.vendors = new App.Collections.VendorCollection([
	{
		name: 'Amazon',
		logoCode: 'amazon',
		logoImgPath: 'http://upload.wikimedia.org/wikipedia/commons/a/aa/Amazon_logo.jpg',
		vendorUrl: 'amazon.com'
	},
	{
		name: 'Seamless',
		logoCode: 'seamless',
		vendorUrl: 'seamless.com',
		optionsView: App.Models.RestaurantPickerView
	},
	{
		name: 'Fresh Direct',
		logoCode: 'freshdirect',
		vendorUrl: 'freshdirect.com'
	},
	{
		name: 'Drugstore.com',
		logoCode: 'drugstore',
		vendorUrl: 'drugstore.com'
	},
	{
		name: 'Best Buy',
		logoCode: 'bestbuy',
		vendorUrl: 'bestbuy.com'
	}
]);