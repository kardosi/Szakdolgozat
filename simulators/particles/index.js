var canvas = null;
var canvasPosition = null;
var context = null;

var simulator = null;

var cup = false;
var line = false;


function initialize(){

  simulator = new Simulator();

  canvas = document.getElementById("canvas");
  canvasPosition = canvas.getBoundingClientRect();
  context = canvas.getContext("2d");



  setInterval(function()
    {
      simulator.update();
      simulator.draw();
      simulator.collisionBall();
      simulator.collisonWall();
      if(cup == true)
      {
        simulator.drawCup();
        simulator.collisionCup();
      }



    },(1000/60));



};
function addCup(){
  //simulator.number();

  cup = true;

};
function remoteCup(){
  cup = false;
};
