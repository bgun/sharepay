App.module("Utils", function(Mod, App, Backbone, Marionette, $, _) {
  Mod.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  Mod.arraySum = function(arr) {
    return _(arr).reduce(function(m,x) {
      return m + x; 
    }, 0);
  };
  Mod.hashSum = function(hash, param) {
    return this.arraySum(_(hash).pluck(param));
  };
});
