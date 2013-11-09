app.get('/oauth/dwolla', function(req, res){
	res.set("Content-Type","application/json");
	res.send({"hello": "test"});
});

var OAuth = require('OAuth'); 

var OAuth2 = OAuth.OAuth2;    
 var twitterConsumerKey = 'hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo';
 var twitterConsumerSecret = 'Jy5ZexkIFj4lNUnyJJtCzF8/VYoeTikMFwm7mtYK132PoLr7xA';
 var oauth2 = new OAuth2(
   twitterconsumerKey,
   twitterConsumerSecret,
   'https://www.dwolla.com',
   '/oauth/v2/authenticate',
   '/oauth/v2/token'
   );
 
 
 oauth2.getOAuthAccessToken(
   '',
   {'grant_type':'client_credentials'},
   function (e, access_token, refresh_token, results){
     console.log('bearer: ',access_token);
     oauth2.get('protected url', 
       access_token, function(e,data,res) {
         if (e) return callback(e, null);
         if (res.statusCode!=200) 
           return callback(new Error(
             'OAuth2 request failed: '+
             res.statusCode),null);
         try {
           data = JSON.parse(data);        
         }
         catch (e){
           return callback(e, null);
         }
         return callback(e, data);
      });
   });