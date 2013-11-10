App.Utils = {
  isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  arraySum: function(arr) {
    return _(arr).reduce(function(m,x) {
      return m + x; 
    }, 0);
  },
  hashSum: function(hash, param) {
    return this.arraySum(_(hash).pluck(param));
  }
};
