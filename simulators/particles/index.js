var canvas = null;
var canvasPosition = null;
var context = null;

var simulator = null;


function initialize(){

  simulator = new Simulator();

  canvas = document.getElementById("canvas");
  canvasPosition = canvas.getBoundingClientRect();
  context = canvas.getContext("2d");



  setInterval(function()
    {
      simulator.update();
      simulator.draw();
      simulator.collisonWall();
      simulator.collisionBall();

    },(1000/24));




};
