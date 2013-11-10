App.Models.UserModel = Backbone.Model.extend({
	
	defaults: {
		currentUser: null,
		isHost: false
	},

	parse: function(response) {
		return response.user;
	},
	
	initialize: function(options) {
		var that = this;
		/*vendorAjax = $.ajax({
			type: 'GET',
			url: url + '/api/user',
			dataType: "json"
		}).done(function(data){
			
		});
		*/
	}

});