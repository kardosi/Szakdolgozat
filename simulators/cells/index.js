  var canvas = null;
  var canvasPosition = null;
  var context = null;

var grid = null;

  function initialize()
  {
    grid = new Grid(60, 80);

    canvas = document.getElementById("canvas");
    canvasPosition = canvas.getBoundingClientRect();
    context = canvas.getContext("2d");
    grid.initPixels();
    grid.drawPixels();


    setInterval(function()
      {
        grid.updatePixels();




      },(1000/60));

  }
