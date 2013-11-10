var url = require('url');
var request = require('request');

module.exports = function(app){
	var dwolla = {
		appId: 'hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo',
		appSecret: 'Jy5ZexkIFj4lNUnyJJtCzF8/VYoeTikMFwm7mtYK132PoLr7xA'
	};
	var venmo = {
		appId: 'ErheST43pgbsELXRagREYdhAq7E25tyj',
		appSecret: 'U5DkVMPQYHmpZj7SNxWdHqRb65d4ApNK'
	};
	
	app.get('/auth/venmo_challenge', function(req, res){
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		res.send(query.venmo_challenge);
	});
	
	app.get('/auth/venmo_callback', function(req, res){
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		console.log('got venmo code'+query.code);
		var surl = "https://api.venmo.com/oauth/access_token";
		
		request({	method:"POST",
					url:surl,
					form:{
						client_id : venmo.appId,
						code: query.code,
						client_secret: venmo.appSecret
					}
			}, function (e, r, body) {
			obj = JSON.parse(body);
			console.log(obj);
			res.send('<html><head><script type="text/javascript">'+
			'window.opener.postMessage({"type":"venmo","token":"'+obj.access_token+'"}, "*");window.close();</script>'+
			'</head><body></body></html>');
		});
		
	});
	
	app.get('/auth/dwolla_callback', function(req, res){
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		console.log('got dwolla code'+query.code);
		var redirectUri = encodeURIComponent("http://sharepay.herokuapp.com/auth/dwolla_callback");
		var surl = "https://www.dwolla.com/oauth/v2/token?client_id="+dwolla.appId+"&client_secret="+
			dwolla.appSecret+"&grant_type=authorization_code&redirect_uri="+redirectUri+"&code="+query.code;
		
		request.get(surl, function (e, r, body) {
			obj = JSON.parse(body);
			console.log(obj);
			res.send('<html><head><script type="text/javascript">'+
			'window.opener.postMessage({"type":"dwolla","token":"'+obj.access_token+'"}, "*");window.close();</script>'+
			'</head><body></body></html>');
		});
		
	});
	
	app.post('/api/processor/dwolla',function(req, resp){
		var js = req.body;
		console.log(js);
		var url = "https://www.dwolla.com/oauth/rest/transactions/send";
		request({
			method:"POST", 
			uri: url, 
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify(js)
		}, function(err, r, body){
			console.log("error",err);
			console.log("http code", r.statusCode);
			console.log("body", body);
			resp.send(body);
		});
	});
};
