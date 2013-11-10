App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
  Mod.LoginView = Marionette.Layout.extend({
    template: 'login',
    tagName: 'form',
    className: 'login-view',
    events: {
      'submit': 'login'
    },
    initialize: function(options) {
      this.callback = options.loginCallback;
    },
    login: function(e) {
      e.preventDefault();
      var email = this.$el.find('.email').val();
      this.callback.call(null,email);
    },
    onHide: function() {
      this.$el.slideUp();
    }
  });
});
