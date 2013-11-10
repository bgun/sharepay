App.module("Views", function(Mod, App, Backbone, Marionette, $, _) {
  Mod.Views.TrackView = Backbone.View.extend({

    id: "trackView",

    tagName: "div",

    events: {
      "click #clearSelected" : "clearSelected"
    },

    initialize: function() {
      var t = this;
      t.model = t.options.model;
      t.cells = [];
      var localName = localStorage.getItem('myName');
      if (localName) {
        t.model.set('name', localName);
      }
      t.render(t.options.songId);
      console.log("Initializing TrackView");
    },

    render: function() {
      console.time("render");
      new FastClick(document.body);

      var t = this;
      var i,j;

      // build HTML for view, build the grid
      var trackTemplate = _.template(templateManager.getTemplate("track"));
      var trackHtml = trackTemplate({
        gridCells: App.Utils.makeGrid(App.settings.GRID_SIZE)
      });
      t.$el.html(trackHtml);
      $('#content').html(t.$el);

      // responsively set cell widths
      t.$grid = t.$el.find('#grid');
      t.$grid.height(t.$grid.width());

      t.$name = $('#userNameInput');
      t.$name.val(t.model.get('name'));

      var changeCell = function(e) {
        console.log(e.type);
        var $t = $(e.currentTarget);
        var index = $t.index();

        if($t.hasClass('selected')) {
          $t.removeClass('selected');
          t.cells = _.filter(t.cells,function(i) { return i != index; });
        } else {
          $t.addClass('selected');
          t.cells.push(index);
          if(t.cells.length > App.settings.MAX_SELECTIONS_PER_TRACK) {
            var removeSelection = t.cells.shift();
            t.$grid.find('#cell-'+removeSelection).removeClass('selected');
          }
        }
        smartSendCells(t.cells, t.$name.val());
        return false;
      };
      var smartSendCells = _.bind(_.debounce(t.sendCells, 100, true), t);
      var dragging = false;

      t.$grid
        .on('click','.cell',function(e) {
          changeCell(e);
        })
        .on('mouseup mousedown touchstart touchend',function(e) {
          if(e.type == "mousedown" || e.type == "touchstart") {
            dragging = true;
          }
          if(e.type == "mouseup" || e.type == "touchend") {
            dragging = false;
          }
        });

      setTimeout(function() {
        window.scrollTo(0,1);
      },0);
      console.timeEnd("render");
    },

    sendCells: function(cells, name) {
      var t = this;
      var obj = {
        cells: cells.join(','),
        name: name
      };
      t.model.set(obj);
    },

    clearSelected: function(e) {
      var t = this;
      for(var c=0;c<t.cells.length;c++) {
        t.$grid.find('#cell-'+t.cells[c]).removeClass('selected');
      }
      t.cells = [];
      t.sendCells(t.cells, t.$name.val());
    }

  });
});
