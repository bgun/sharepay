App.Utils = {
  makeGrid: function(gridSize) {
    var gridTemplate  = _.template(templateManager.getTemplate("grid"));
    var gridArea = gridSize * gridSize;
    var grid = Array(gridArea);
    for(i=0;i<grid.length;i++) {
      grid[i] = {
        index: i,
        column: i%16,
        row: Math.floor(i/16)
      };
    }
    return gridTemplate({
      grid: grid,
      gridWidth: (100 / gridSize)+"%"
    });
  }
}
