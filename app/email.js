var email   = require("emailjs");
var server  = email.server.connect({
   user:    "sharepay1@gmail.com", 
   password:"sharpeipei", 
   host:    "smtp.gmail.com", 
   ssl:     true

});

// send the message and get a callback with an error or details of the message that was sent
exports.sendMail = function(toName, toEmail, subject, body) {
  var to = toEmail;
  if(toName){
	  to += " <"+toName+">";
  }
  server.send({
    text:    body, 
    from:    "SharePay <sharepay1@gmail.com>", 
    to:      to,
    subject: subject
  }, function(err, message) { console.log(err || message); });
};
