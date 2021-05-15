  var canvas = null;
  var canvasPosition = null;
  var context = null;
  var cup = false;

var grid = null;
var simulator = null;

  function initialize()
  {
    grid = new Grid(60, 80);
    simulator = new Simulator();

    canvas = document.getElementById("canvas");
    canvasPosition = canvas.getBoundingClientRect();
    context = canvas.getContext("2d");




    setInterval(function()
      {

        simulator.updatePixels();
        simulator.draw();
        simulator.collisonWall();
        simulator.collisionPixel();

        if(cup == true)
        {
          simulator.drawCup();
          simulator.collisionCup();
        }



      },(1000/60));

  };

  function addCup(){
    cup = true;

  };
  function remoteCup(){
    cup = false;
  };
