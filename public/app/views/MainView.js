App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.MainView = Marionette.Layout.extend({
		template: 'main',
		regions: {
			vendors:'#vendorList',
			processors:'#processorList'
		},
		className: 'main-view',
		events: {
			'click button': 'saveCart'
		},
		onRender: function(options) {
			window.testMainView =  this;
			var that = this,
				vendorColl,
				processorColl;

			vendorColl = new App.Collections.VendorCollection();
			vendorColl.fetch().done(function() {
				var pickerView = new App.Views.VendorPickerCollectionView({
					collection: vendorColl
				});
				that.vendors.show(pickerView);
				pickerView.on('itemview:vendorselected', function(view,selectedVendorModel) {
					that.model.set('vendor', selectedVendorModel);
				});
			});

			processorColl = new App.Collections.ProcessorCollection();
			processorColl.fetch().done(function() {
				var pickerView = new App.Views.ProcessorPickerCollectionView({
					collection: processorColl
				});
				that.processors.show(pickerView);
				pickerView.on('itemview:addprocessor', function(view,selectedProcessorModel) {
					that.model.get('processors').add(selectedProcessorModel);
				});
				pickerView.on('itemview:removeprocessor', function(view,selectedProcessorModel) {
					that.model.get('processors').remove(selectedProcessorModel);
				});
			});
		},
		saveCart: function() {
			var that = this;

			this.processEmails();
			
			this.model.save().done(function() {
				App.router.navigate('cart/' + that.model.id + '/email/' + 'ben@bengundersen.com', {trigger: true, replace: true});
			});	
		},
		processEmails: function() {
			var that = this,
				inputText = $('#emailInput').val(),
				userEmails = inputText.split(',');

			console.lo

			this.model.set('users', userEmails);
		}
	});
});
