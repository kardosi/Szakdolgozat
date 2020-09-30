var canvas;
var context;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var d;
var pontok=[257, 457,
444, 53,
604, 441,
225, 206,
637, 187];
var pontokx=[];
var pontoky=[]
var pontokszama=20;
var talalt;
var db=0;
var vonal=false;
var p=0;
var v=0;
var vege=false;
var elso=0;
var masodik=0;
var j=0;

var canvasx = $(canvas).offsetLeft;
var canvasy = $(canvas).offsetTop;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;

$(document).ready(function(){
canvas=$('#canvas');
context=$('#canvas')[0].getContext('2d');

redraw();
});

function redraw(){


}
