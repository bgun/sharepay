var url = require('url');
var request = require('request');
var crypto = require('crypto');

module.exports = function(app){
	var dwolla = {
		appId: 'hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo',
		appSecret: 'Jy5ZexkIFj4lNUnyJJtCzF8/VYoeTikMFwm7mtYK132PoLr7xA'
	};
	var venmo = {
		appId: '1488',
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
      resp.set("Content-Type","text/json");
      resp.set("Access-Control-Allow-Origin","*");
			resp.send(body);
		});
	});
	
	app.post('/api/processor/venmo', function(req, resp){
		var js = req.body;
		console.log(js);
		var url = "https://api.venmo.com/payments";
		request({
			method:"POST", 
			uri: url, 
			form: js
		}, function(err, r, body){
			console.log("error",err);
			console.log("http code", r.statusCode);
			console.log("body", body);
      resp.set("Content-Type","text/json");
      resp.set("Access-Control-Allow-Origin","*");
			resp.send(body);
		});
	});
	
	app.post('/api/processor/zipmark', function(req,resp){
		var js = {
			"disbursement": req.body
			};
		
		js.disbursement.customer_id = crypto.createHash('md5').update(req.body.user_email).digest("hex");
		console.log(js);
		request({
			method:"POST",
			uri: "https://sandbox.zipmark.com/disbursements",
			body: JSON.stringify(js),
			auth : {
			    'user': 'Yzk1OTE3NTMtZGI3NC00NjAxLTkzZjYtNWE5YjNmMjk2MTBm',
			    'pass': 'be6a6e5440cc162c3544659dc12cd34513a238149ac9bfcb45ff7d638ac15ce22938f8f1278686e9fdd1a76adf44da7445de3d19ca579f2963212670ccff7ad9',
			    'sendImmediately': false
			}
		}, function(err, r, body){
			console.log(err);
			console.log(r);
			console.log(body);
			resp.send(body);
		});
	});
};
