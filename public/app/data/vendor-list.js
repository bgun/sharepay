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
		logoImgPath: 'http://www.seamless.com/img/logo.png?3d8fd5',
		vendorUrl: 'seamless.com',
		optionsView: App.Models.RestaurantPickerView
	},
	{
		name: 'Fresh Direct',
		logoCode: 'freshdirect',
		logoImgPath: 'https://www.freshdirect.com/media/images/navigation/global_nav/fd_logo_on.gif',
		vendorUrl: 'freshdirect.com'
	}
]);