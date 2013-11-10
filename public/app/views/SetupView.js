App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
	Mod.SetupView = Marionette.Layout.extend({
		template: 'main',
		regions: {
			vendors:'#vendorList',
			processors:'#processorList'
		},
		className: 'main-view',
		events: {
			'click button.main-submit': 'saveCart'
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
			this.model.set('host',App.user.toJSON());
			var deadline = new Date();
			deadline.setHours(deadline.getHours()+1);
			this.model.set('deadline',deadline);
			this.model.save().done(function(){
				App.router.navigate('cart/'+that.model.get('_id')+'/email/'+App.user.get('email'), {trigger: true, replace: true});
			});
		},
		processEmails: function() {
			var that = this,
				inputText = $('#emailInput').val(),
				userEmails = inputText.split(',');

			console.log(userEmails);

			this.model.set('emails', userEmails);
		}
	});
});
