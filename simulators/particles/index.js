var canvas;
var context;

var simulator = null;


$(document).ready(function(){


  canvas=$('#canvas');
  context=$('#canvas')[0].getContext('2d');


  simulator = new Simulator();
  simulator.draw();




  //resize();

});


/*function resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    editor.resize(canvas.width, canvas.height);
}*/
