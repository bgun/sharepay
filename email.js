var email   = require("emailjs");
var server  = email.server.connect({
   user:    "sharepay1@gmail.com", 
   password:"sharpeipei", 
   host:    "smtp.gmail.com", 
   ssl:     true

});

// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    "This was too easy", 
   from:    "SharePay <sharepay1@gmail.com>", 
   to:      "Post Versichern <postversichern@gmail.com>",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });