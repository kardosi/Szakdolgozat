var canvas = null;
var canvasPosition = null;
var context = null;

var simulator = null;


function initialize(){

  simulator = new Simulator();

  canvas = document.getElementById("canvas");
  canvasPosition = canvas.getBoundingClientRect();
  context = canvas.getContext("2d");



  simulator.draw();
  simulator.collision();



  //resize();

};


/*function resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    editor.resize(canvas.width, canvas.height);
}*/
