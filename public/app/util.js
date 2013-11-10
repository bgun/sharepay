App.module("Utils", function(Mod, App, Backbone, Marionette, $, _) {
  Mod.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  Mod.arraySum = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  Mod.hashSum = function(hash, param) {
    return this.arraySum(_(hash).pluck(param));
  };
});
