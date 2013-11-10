App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
  Mod.CartView = Backbone.View.extend({

    idAttribute: "_id",

    el: '#content',

    events: {
      'click .add-shared-item-btn': 'addSharedItem',
      'click .dwolla-btn': 'makeDwollaPayment',
      'click .venmo-btn': 'makeVenmoPayment',
      'click .send-order': 'sendOrder'
    },

    initialize: function(options) {
      var self = this;
      this.model = options.model;
      this.model.on('change', function(){
        self.render();
      });
      // for oAuth
      window.addEventListener('message', function(event) {
        console.log('received response: ',event.data);
        if(event.data.token != "undefined"){
        var url = 'http://sharepay.herokuapp.com';
            $.ajax({
              type: 'POST',
              url: url + '/api/user/token',
              data: {data: JSON.stringify({
                email: App.user.get('email'),
                type : event.data.type,
                token : event.data.token
              })}
            });
            var tokens = App.user.get('tokens');
            tokens = tokens || {};
            tokens[event.data.type] = event.data.token;
            App.user.set('tokens', tokens);
            if(event.data.type == "dwolla"){
              self.makeDwollaPayment();
            } else if(event.data.type == "venmo"){
              self.makeVenmoPayment();
            }
        } else {
            alert("oauth error");
        }
      },false);
      
    },

    render: function() {
      var self = this,
        COUNTDOWN_INTERVAL = 1000*1, // 1 min
        templateFn = _.template(templateManager.getTemplate('cart')),
        obj = this.model.toJSON(),
        html;

      obj.timeLeft = this.model.getTimeLeft();
      obj.sharedShare = this.model.getSharedShare();
      obj.currentUserId = App.user.get('_id');
      obj.totalCost = this.model.getTotalCost();
      obj.totalContributions = this.model.getTotalContribution();
      obj.isHost = App.user.get('isHost');
      html = templateFn(obj);
      this.$el.html(html);

      this.intervalId = setInterval(function(){
        self.updateCountdown();
      }, COUNTDOWN_INTERVAL);
      return this;
    },


    addSharedItem: function(e) {
      var name = this.$el.find('.item-name-input').val(),
        price = this.$el.find('.item-price-input').val(),
        errors = [];
      e.preventDefault();
      if (!name) { errors.push('Item Name is required.'); }
      if (!price) { errors.push('Price is required.'); }
      if (!App.Utils.isNumber(price) && price > 0) { errors.push('Price must be a positive number.'); }
      if (errors.length) {
        toastr.error(errors.join('<br>'));
      } else {
        this.model.addItem({
          name: name,
          price: +price
        });
      }
    },

    updateCountdown: function() {
      this.$el.find('.time-left').html(this.model.getTimeLeft());
    },

    makeDwollaPayment: function() {
      console.log('dwolla!');
      var tokens = App.user.get('tokens') || {};
      if(typeof tokens.dwolla != "undefined"){
        // make dwolla payment here
        console.log("make dwolla payment here... token "+tokens.dwolla);
        var pin = prompt("Please enter your Dwolla pin:");
        var url = 'http://sharepay.herokuapp.com';
        //var url = 'http://localhost:5000';
        $.ajax({
          type: 'POST',
          url: url+'/api/processor/dwolla',
          data: {
            oauth_token: tokens.dwolla,
            pin: pin,
            destinationId: "reflector@dwolla.com",
            destinationType: "Email",
            amount: 0.01,
            notes: "for blah blah blah"
          }
        }).done(function(data){
          console.log(data);
        });
      } else {
        window.open("https://www.dwolla.com/oauth/v2/authenticate"+
          "?redirect_uri="+encodeURIComponent("http://sharepay.herokuapp.com/auth/dwolla_callback")+
          "&client_id=hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo"+
          "&response_type=code&scope=send%7Crequest","_blank");
      }
    },

    makeVenmoPayment: function() {
      console.log('venmo!...?');
      var tokens = App.user.get('tokens') || {};
      if(typeof tokens.venmo != "undefined"){
        // make dwolla payment here
        console.log("make venmo payment here... token "+tokens.venmo);
        var url = 'http://sharepay.herokuapp.com';
        //var url = 'http://localhost:5000';
        /*$.ajax({
          type: 'POST',
          url: url+'/api/processor/venmo',
          data: {
            oauth_token: tokens.dwolla,
            pin: pin,
            destinationId: "reflector@dwolla.com",
            destinationType: "Email",
            amount: 0.01,
            notes: "for blah blah blah"
          }
        }).done(function(data){
          console.log(data);
        });*/
      } else {
        window.open("https://api.venmo.com/oauth/authorize"+
          "?client_id=1488"+
          "&response_type=code&scope=make_payments","_blank");
      }

    },

    sendOrder: function() {
      console.log('sending');
    }
  });
});
