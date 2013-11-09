var url = require('url');

module.exports = function(app){
	var options = {
		appId: 'hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo',
		appSecret: 'Jy5ZexkIFj4lNUnyJJtCzF8/VYoeTikMFwm7mtYK132PoLr7xA'
	};
	//var dwolla = require("./dwolla")(options);
	//dwolla.setupRoutes(app);
	app.get('/auth/test',function(req, res) {
		res.send('<a href="https://www.dwolla.com/oauth/v2/authenticate?client_id='+
				options.appId+'&response_type='+options.appSecret+'&scope=send|request" target="_blank">test</a>');
	});
	app.get('/auth/dwolla_callback', function(req, res){
		res.set("Content-Type","application/json");
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		res.send(JSON.stringify(query));
	});
};
