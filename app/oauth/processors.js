var url = require('url');
var request = require('request');

module.exports = function(app){
	var dwolla = {
		appId: 'hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo',
		appSecret: 'Jy5ZexkIFj4lNUnyJJtCzF8/VYoeTikMFwm7mtYK132PoLr7xA'
	};
	//var dwolla = require("./dwolla")(options);
	//dwolla.setupRoutes(app);
	app.get('/oauth/code',function(req, res) {
		res.redirect("http://localhost:5000/auth/dwolla_callback?code=abc123");
	});
	
	app.get('/auth/dwolla_callback', function(req, res){
		//res.set("Content-Type","application/json");
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		var redirectUri = "http://www.sharepay.herokuapp.com/auth/dwolla_callback";
		var surl = "https://www.dwolla.com/oauth/v2/token?client_id="+dwolla.appId+"&client_secret="+
			dwolla.appSecret+"&grant_type=authorization_code&redirect_uri="+redirectUri+"&code="+query.code;
		console.log('oauth url: '+surl);
		request.get(surl, function (e, r, body) {
			obj = JSON.parse(body);
			console.log(obj);
			//res.send(JSON.stringify(obj));
			res.send('<html><head><script type="text/javascript">'+
			'window.opener.postMessage("'+obj.access_token+'", "*");window.close();</script>'+
			'</head><body></body></html>');
		});
		//res.send(JSON.stringify(query));
		
		
		//https://www.dwolla.com/oauth/v2/token?client_id={client_id}&client_secret={client_secret}&grant_type=authorization_code&redirect_uri={redirect_uri}&code={code}
	});
};
