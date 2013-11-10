var templateManager = (function($, _) {
  var templates = {},
      templateKeys = ['main', 'cart', 'vendor'];

  var getTemplate = function(key) {
    if (!templates[key]) {
      $.ajax({
        async: false,
        url: './app/templates/' + key + '.ejs.html', 
        success: function(data){
          templates[key] = data;
        }
      });
    }
    return templates[key];
  };

  var loadTemplates = function() {
    _(templateKeys).each(getTemplate);
  };

  return {
    getTemplate: getTemplate,
    loadTemplates: loadTemplates,
    templates: templates
  };
})(jQuery, _);


  