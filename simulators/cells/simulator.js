
class Simulator
{
  constructor()
  {
    this._pixels = this.creatPixels(100);
  }

  updatePixels()
  {


    let dy = 0;
    let dx = 0;
    let fps = 1/60;
    let ag = 9.81;

    let gravity = document.getElementById("gravity").value;
    let density = document.getElementById("density").value;
    let drag = document.getElementById("drag").value;
    let mass = parseInt(document.getElementById("mass").value);

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < this._pixels.length; i++) {

      if(i != this._pixels.length){
        let fx = -0.5 * drag * density * this._pixels[i].area * this._pixels[i].velocity.x * this._pixels[i].velocity.x * (this._pixels[i].velocity.x / Math.abs(this._pixels[i].velocity.x));
        let fy = -0.5 * drag * density * this._pixels[i].area * this._pixels[i].velocity.y * this._pixels[i].velocity.y * (this._pixels[i].velocity.y / Math.abs(this._pixels[i].velocity.y));

        fx = (isNaN(fx)? 0 : fx);
        fy = (isNaN(fy)? 0 : fy);


        let ax = fx / mass;
        let ay = (ag * gravity) + (fy / mass);


        this._pixels[i].velocity.x += ax * fps;
        this._pixels[i].velocity.y += ay * fps;


        this._pixels[i].x += this._pixels[i].velocity.x * fps * 100;
        this._pixels[i].y += this._pixels[i].velocity.y * fps * 100;
      }


    }

    context.fillStyle = 'black';
    context.font = "11pt Ariel";
    context.fillText("Drag Coefficient: " + drag, 0, 32);
    context.fillText("Density: " + density + " kg/m^3", 0, 48);
    context.fillText("Gravity: " + gravity + " g", 0, 64);
    context.fillText("Mass: " + mass + " kg", 0, 80);




  }


    draw(){
      for(let pixel of this._pixels){
        pixel.draw();
      }
    }

    drawCup()
    {
      let x1 = parseInt(document.getElementById("x1").value);
      let x2 = parseInt(document.getElementById("x2").value);
      let x3 = parseInt(document.getElementById("x3").value);
      let x4 = parseInt(document.getElementById("x4").value);
      let y1 = parseInt(document.getElementById("y1").value);
      let y2 = parseInt(document.getElementById("y2").value);
      let y3 = parseInt(document.getElementById("y3").value);
      let y4 = parseInt(document.getElementById("y4").value);

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x3, y3);
      context.lineTo(x4, y4);
      context.stroke();

    }

    collisonWall()
    {

      for (var i = 0; i < this._pixels.length; i++) {
        let rockbottom = canvas.height - this._pixels[i].height;
        let rockside= canvas.width - this._pixels[i].width;
        if (this._pixels[i].y > rockbottom) {
            this._pixels[i].y = rockbottom;
            this._pixels[i].velocity.y *= this._pixels[i].e;
          }
        if (this._pixels[i].y < 0){
          this._pixels[i].y = 0;
          this._pixels[i].velocity.y *= this._pixels[i].e;
          }

        if (this._pixels[i].x > rockside) {
            this._pixels[i].x = rockside;
            this._pixels[i].velocity.x *= this._pixels[i].e;
          }

        if (this._pixels[i].x < 0){
          this._pixels[i].x = 0;
          this._pixels[i].velocity.x *= this._pixels[i].e;

          }

        }


      }


  collisionPixel()
  {
    let mass = parseInt(document.getElementById("mass").value);

    for (var i = 0; i < this._pixels.length; i++) {
      for (var j = i+1; j < this._pixels.length; j++) {
        if (this._pixels[i].x < this._pixels[j].x + this._pixels[j].width &&
       this._pixels[i].x + this._pixels[i].width > this._pixels[j].x &&
       this._pixels[i].y < this._pixels[j].y + this._pixels[j].height &&
       this._pixels[i].y + this._pixels[i].height > this._pixels[j].y)
       {

         let distance = this._pixels[i].distance(this._pixels[j]);



         let nx = (this._pixels[j].x -  this._pixels[i].x) / distance;
         let ny = (this._pixels[j].y -  this._pixels[i].y) / distance;
         let p = 2 * (this._pixels[i].velocity.x * nx + this._pixels[i].velocity.y * ny - this._pixels[j].velocity.x * nx - this._pixels[j].velocity.y * ny) / (mass + mass);
         let colPointX = ((this._pixels[i].x * this._pixels[j].width) + (this._pixels[j].x * this._pixels[i].width)) / (this._pixels[i].width + this._pixels[j].width);
         let colPointY = ((this._pixels[i].y * this._pixels[j].height) + (this._pixels[j].y * this._pixels[i].height)) / (this._pixels[i].height + this._pixels[j].height);

         this._pixels[i].x = colPointX + this._pixels[i].width * (this._pixels[i].x - this._pixels[j].x) / distance;
         this._pixels[i].y = colPointY + this._pixels[i].height * (this._pixels[i].y - this._pixels[j].y) / distance;
         this._pixels[j].x = colPointX + this._pixels[j].width * (this._pixels[j].x - this._pixels[i].x) / distance;
         this._pixels[j].y = colPointY + this._pixels[j].height * (this._pixels[j].y - this._pixels[i].y) / distance;

         this._pixels[i].velocity.x -= p * mass * nx;
         this._pixels[i].velocity.y -= p * mass * ny;
         this._pixels[j].velocity.x += p * mass * nx;
         this._pixels[j].velocity.y += p * mass * ny;


       }
      }
    }
  }



  creatPixels(colorPixels)
  {
    let pixels = [];
    for(var i=0; i<colorPixels; i++)
    {
      let x = Math.floor(Math.random() * 790)+0;
      let y = Math.floor(Math.random() * 590)+0;
      let pixel = new Pixel(x, y, 10, 10, 0.9);
      pixels.push(pixel);
    }
    return pixels;
  }

  collisionCup()
  {
    let x1 = parseInt(document.getElementById("x1").value);
    let x2 = parseInt(document.getElementById("x2").value);
    let x3 = parseInt(document.getElementById("x3").value);
    let x4 = parseInt(document.getElementById("x4").value);
    let y1 = parseInt(document.getElementById("y1").value);
    let y2 = parseInt(document.getElementById("y2").value);
    let y3 = parseInt(document.getElementById("y3").value);
    let y4 = parseInt(document.getElementById("y4").value);


    for (var i = 0; i < this._pixels.length; i++) {
      let x = this._pixels[i].x + this._pixels[i].velocity.x;
      let y = this._pixels[i].y + this._pixels[i].velocity.y;

      let hit1 = this.linePixels1(x1,y1, x2,y2, x,y, this._pixels[i].width);
      let hit2 = this.linePixels2(x2,y2, x3,y3, x,y, this._pixels[i].height);
      let hit3 = this.linePixels3(x3,y3, x4,y4, x,y, this._pixels[i].width);

      if (hit1)
      {
        this._pixels[i].velocity.x *= this._pixels[i].e;
        this._pixels[i].x = x + this._pixels[i].width;
      }

      if (hit2)
      {
        this._pixels[i].velocity.y *= this._pixels[i].e;
        this._pixels[i].y = y - this._pixels[i].height;
      }

      if (hit3)
      {
        this._pixels[i].velocity.x *= this._pixels[i].e;
        this._pixels[i].x = x - this._pixels[i].width;
      }
    }
  }

  linePixels1(x1, y1, x2, y2, cx, cy, r){

    /*let inside1 = this.pointCircle(x1,y1, cx,cy,r);
    let inside2 = this.pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;*/

    let distX = x1 - x2;
    let distY = y1 - y2;
    let len = Math.sqrt( (distX*distX) + (distY*distY) );

    let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

    let closestX = x1 + (dot * (x2-x1));
    let closestY = y1 + (dot * (y2-y1));

    let onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;


    distX = closestX - cx;
    distY = closestY - cy;

    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    for (var i = 0; i < this._pixels.length; i++) {

      let x = this._pixels[i].x + this._pixels[i].velocity.x;

      if(closestX>=x)
      {
        if (distance <= r) {
          return true;
        }
        return false;

      }

    }


  }


  linePixels2(x1, y1, x2, y2, cx, cy, r){

    /*let inside1 = this.pointCircle(x1,y1, cx,cy,r);
    let inside2 = this.pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;*/

    let distX = x1 - x2;
    let distY = y1 - y2;
    let len = Math.sqrt( (distX*distX) + (distY*distY) );

    let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

    let closestX = x1 + (dot * (x2-x1));
    let closestY = y1 + (dot * (y2-y1));

    let onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;

    distX = closestX - cx;
    distY = closestY - cy;

    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    for (var i = 0; i < this._pixels.length; i++) {

      let y = this._pixels[i].y + this._pixels[i].velocity.y;

      if(closestY<=y)
      {
        if (distance <= r) {
          return true;
        }
        return false;
      }


    }

  }


  linePixels3(x1, y1, x2, y2, cx, cy, r){

    /*let inside1 = this.pointCircle(x1,y1, cx,cy,r);
    let inside2 = this.pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) return true;*/

    let distX = x1 - x2;
    let distY = y1 - y2;
    let len = Math.sqrt( (distX*distX) + (distY*distY) );

    let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

    let closestX = x1 + (dot * (x2-x1));
    let closestY = y1 + (dot * (y2-y1));

    let onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;

    distX = closestX - cx;
    distY = closestY - cy;

    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    for (var i = 0; i < this._pixels.length; i++) {

      let x = this._pixels[i].x + this._pixels[i].velocity.x;

      if(closestX<=x)
      {
        if (distance <= r) {
          return true;
        }
        return false;
      }

    }


  }

  linePoint(x1, y1, x2, y2, px, py) {

    let dx1 = px - x1;
    let dy1 = py - y1;
    let dx2 = px - x2;
    let dy2 = py - y2;
    let d1 = Math.sqrt((dx1*dx1) + (dy1*dy1));
    let d2 = Math.sqrt((dx2*dx2) + (dy2*dy2));


    let lx = x1 - x2;
    let ly = y1 - y2;
    let lineLen = Math.sqrt((lx*lx) + (ly*ly));

    let buffer = 0.1;

    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
  }







}
