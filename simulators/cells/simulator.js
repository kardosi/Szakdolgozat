
class Simulator
{
  constructor()
  {
    this._pixels = this.creatPixels(500);
  }

  updatePixels()
  {


    let gravity = 0.05;
    let dy = 0;
    let dx = 0;
    let drag = 0.47;
    let density = 1.22;
    let fps = 1/60;
    let ag = 9.81;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < this._pixels.length; i++) {

      if(i != this._pixels.length){
        let fx = -0.5 * drag * density * this._pixels[i].area * this._pixels[i].velocity.x * this._pixels[i].velocity.x * (this._pixels[i].velocity.x / Math.abs(this._pixels[i].velocity.x));
        let fy = -0.5 * drag * density * this._pixels[i].area * this._pixels[i].velocity.y * this._pixels[i].velocity.y * (this._pixels[i].velocity.y / Math.abs(this._pixels[i].velocity.y));

        fx = (isNaN(fx)? 0 : fx);
        fy = (isNaN(fy)? 0 : fy);


        let ax = fx / this._pixels[i].mass;
        let ay = (ag * gravity) + (fy / this._pixels[i].mass);


        this._pixels[i].velocity.x += ax * fps;
        this._pixels[i].velocity.y += ay * fps;


        this._pixels[i].x += this._pixels[i].velocity.x * fps * 100;
        this._pixels[i].y += this._pixels[i].velocity.y * fps * 100;
      }


    }




  }

  collisonWall()
  {

    for (var i = 0; i < this._pixels.length; i++) {
      let rockbottom = canvas.height - this._pixels[i].height;
      let rockside= canvas.width - this._pixels[i].width;
      if (this._pixels[i].y > rockbottom) {
          this._pixels[i].y = rockbottom;
          this._pixels[i].velocity.x *= this._pixels[i].e;
          this._pixels[i].velocity.y *= this._pixels[i].e;
        }
      if (this._pixels[i].y < 0){
        this._pixels[i].y = 0;
        this._pixels[i].velocity.x *= this._pixels[i].e;
        this._pixels[i].velocity.y *= this._pixels[i].e;
        }

      if (this._pixels[i].x > rockside) {
          this._pixels[i].x = rockside;
          this._pixels[i].velocity.x *= this._pixels[i].e;
          this._pixels[i].velocity.y *= this._pixels[i].e;
        }

      if (this._pixels[i].x < 0){
        this._pixels[i].x = 0;
        this._pixels[i].velocity.x *= this._pixels[i].e;
        this._pixels[i].velocity.y *= this._pixels[i].e;
        }

      }


    }

  collisionPixel()
  {
    let bounce = 0.6;

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
         let p = 2 * (this._pixels[i].velocity.x * nx + this._pixels[i].velocity.y * ny - this._pixels[j].velocity.x * nx - this._pixels[j].velocity.y * ny) / (this._pixels[i].mass + this._pixels[j].mass);
         let colPointX = ((this._pixels[i].x * this._pixels[j].width) + (this._pixels[j].x * this._pixels[i].width)) / (this._pixels[i].width + this._pixels[j].width);
         let colPointY = ((this._pixels[i].y * this._pixels[j].height) + (this._pixels[j].y * this._pixels[i].height)) / (this._pixels[i].height + this._pixels[j].height);

         this._pixels[i].x = colPointX + this._pixels[i].width * (this._pixels[i].x - this._pixels[j].x) / distance;
         this._pixels[i].y = colPointY + this._pixels[i].height * (this._pixels[i].y - this._pixels[j].y) / distance;
         this._pixels[j].x = colPointX + this._pixels[j].width * (this._pixels[j].x - this._pixels[i].x) / distance;
         this._pixels[j].y = colPointY + this._pixels[j].height * (this._pixels[j].y - this._pixels[i].y) / distance;

         this._pixels[i].velocity.x -= p * this._pixels[i].mass * nx;
         this._pixels[i].velocity.y -= p * this._pixels[i].mass * ny;
         this._pixels[j].velocity.x += p * this._pixels[j].mass * nx;
         this._pixels[j].velocity.y += p * this._pixels[j].mass * ny;


       }
      }
    }
  }



  creatPixels(colorPixels)
  {
    let pixels = [];
    for(var i=0; i<colorPixels; i++)
    {
      let x = Math.floor(Math.random() * 800)+0;
      let y = Math.floor(Math.random() * 600)+0;
      let pixel = new Pixel(x, y, 10, 10, 0, 0.7, 10);
      pixels.push(pixel);
    }
    return pixels;
  }




  draw(){
    for(let pixel of this._pixels){
      pixel.draw();
    }
  }


}
