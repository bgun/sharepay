App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
  Mod.CartView = Backbone.View.extend({

    idAttribute: "_id",

    el: '#content',

    events: {
      'click .add-shared-item-btn': 'processAddForm',
      'click .dwolla-btn'         : 'makeDwollaPayment',
      'click .venmo-btn'          : 'makeVenmoPayment',
      'click .zipmark-btn'        : 'makeZipMarkPayment',
      'click .send-order'         : 'sendOrder'
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

      // this.intervalId = setInterval(function(){
      //   self.updateCountdown();
      // }, COUNTDOWN_INTERVAL);
      return this;
    },


    processAddForm: function(e) {
      console.log(this.$el);
      var name = this.$el.find('.item-name-input').val(),
        price = this.$el.find('.item-price-input').val(),
        user = this.$el.find('.item-user').val(),
        newItem,
        errors = [];

      console.log(name);

      e.preventDefault();
      if (!name) { errors.push('Item Name is required.'); }
      if (!price) { errors.push('Price is required.'); }
      if (!App.Utils.isNumber(price) && price > 0) { errors.push('Price must be a positive number.'); }
      if (errors.length) {
        toastr.error(errors.join('<br>'));
      } else {
        newItem = {
          name: name,
          price: +price
        };
        if (user !== 'shared') {
          newItem.user = user;
        }
        this.model.addItem(newItem,true);
      }
    },

    updateCountdown: function() {
      this.$el.find('.time-left').html(this.model.getTimeLeft());
    },

    makeZipMarkPayment: function() {
      var that = this;
      var url = 'http://sharepay.herokuapp.com';
      //var url = 'http://localhost:5000';
      $.ajax({
            type: 'POST',
            url: url+'/api/processor/zipmark',
            data: {
              user_email: that.model.get('host').email,
              customer_name: that.model.get('host').name,
              amount_cents: 1, // <--- change this to contribution amount
              memo: "SharePay Purchase " // <--- change this to description
            }
          }).done(function(data){
            console.log(data);
            toastr.success('Thanks for the cash, bro.');
          });
    },
    
    makeDwollaPayment: function() {
      var that = this;
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
          dataType: 'json',
          data: {
            oauth_token: tokens.dwolla,
            pin: pin,
            destinationId: that.model.get('host').email,
            destinationType: "Email",
            amount: 0.01, // <--- change this to contribution amount
            notes: "SharePay Purchase #"+that.getInvoiceNumber() // <--- change this to description
          }
        }).done(function(data){
          console.log(data);
          toastr.success('Thanks for the Dwollas, dude!');
        });
      } else {
        window.open("https://www.dwolla.com/oauth/v2/authenticate"+
          "?redirect_uri="+encodeURIComponent("http://sharepay.herokuapp.com/auth/dwolla_callback")+
          "&client_id=hpNV9Yq75n5EwQiRcT4zlX2imU82tR44OSNlzbzU2X9JnptjQo"+
          "&response_type=code&scope=send%7Crequest","_blank");
      }
    },

    makeVenmoPayment: function() {
      var that = this;
      console.log('venmo!...?');
      var tokens = App.user.get('tokens') || {};
      if(typeof tokens.venmo != "undefined"){
        console.log("make venmo payment here... token "+tokens.venmo);
        var url = 'http://sharepay.herokuapp.com';
        //var url = 'http://localhost:5000';
        $.ajax({
          type: 'POST',
          url: url+'/api/processor/venmo',
          dataType: 'json',
          data: {
            access_token: tokens.venmo,
            email: that.model.get('host').email, // <--- change this to host email
            note: "SharePay Purchase #"+that.getInvoiceNumber(), // <--- change this to description
            amount: 0.01, // <--- change this to contribution amount
          }
        }).done(function(data){
          console.log(data);
          toastr.success('Congratulations! Your Venmo payment went through');
        });
      } else {
        window.open("https://api.venmo.com/oauth/authorize"+
          "?client_id=1488"+
          "&response_type=code&scope=make_payments","_blank");
      }
    },

    makeZipmarkPayment: function() {
      var that = this;
      console.log('go go gadget zipmark');
      var tokens = App.user.get('tokens') || {};
      if(typeof tokens.zipmark != "undefined"){
        console.log("make Zipmark payment here... token "+tokens.venmo);
        var url = 'http://sharepay.herokuapp.com';
        //var url = 'http://localhost:5000';
        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: url+'/api/processor/zipmark',
          data: {
            "amount_cents": 1,
            "customer_name": App.user.get('name') || "Sharepay User",
            "customer_type": "individual",
            "memo": "SharePay Purchase #"+that.getInvoiceNumber(),
            "user_email": App.user.get('email')
          }
        }).done(function(data){
          console.log(data);
          toastr.success('Congratulations! Your Zipmark payment went through');
        });
      } else {
        alert("You need a Zipmark vendor account!");
      }
    },

    getInvoiceNumber: function() {
      // return a random string
      return (Math.random()+"").substr(2,7);
    },

    sendOrder: function() {
      console.log('sending');
    }
  });
});
