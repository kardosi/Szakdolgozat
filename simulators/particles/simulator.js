


class Simulator
{
    constructor()
    {
      this._particles = this.createParticles(100);
    }




    update()
    {
      let gravity = 0.05;
      let dy = 0;
      let dx = 0;
      let drag = 0.47;
      let density = 1.22;
      let fps = 1/60;
      let ag = 9.81;



      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      for (var i = 0; i < this._particles.length; i++) {
        //let dx = Math.random() * 6-3; //brown
        //let dy = Math.random() * 6-3;
        /*dy += gravity;

        this._particles[i].translate(dx, dy);*/



        if(i != this._particles.length){
          let fx = -0.5 * drag * density * this._particles[i].area * this._particles[i].velocity.x * this._particles[i].velocity.x * (this._particles[i].velocity.x / Math.abs(this._particles[i].velocity.x));
    			let fy = -0.5 * drag * density * this._particles[i].area * this._particles[i].velocity.y * this._particles[i].velocity.y * (this._particles[i].velocity.y / Math.abs(this._particles[i].velocity.y));

          fx = (isNaN(fx)? 0 : fx);
    			fy = (isNaN(fy)? 0 : fy);


    			let ax = fx / this._particles[i].mass;
    			let ay = (ag * gravity) + (fy / this._particles[i].mass);


    			this._particles[i].velocity.x += ax * fps;
    			this._particles[i].velocity.y += ay * fps;


    			this._particles[i].x += this._particles[i].velocity.x * fps * 100;
    			this._particles[i].y += this._particles[i].velocity.y * fps * 100;
        }


      }

    }



    createParticles(nParticles)
    {
      let particles = [];
      for(var i=0; i<nParticles; i++)
      {
        let x = Math.floor(Math.random() * 780)+10;
        let y = Math.floor(Math.random() * 580)+10;
        let particle = new Particle(x, y, 10, 0.7, 10);
        particles.push(particle);

      }
      return particles;
    }
    draw()
    {
      for (let particle of this._particles) {
        particle.draw();
      }

    }
    drawCup()
    {
      /*var x1 = x+mag;
      var x2 = x1-szél;*/

      context.beginPath();
      context.moveTo(200, 200);
      context.lineTo(200, 400);
      context.lineTo(350, 400);
      context.lineTo(350, 200);
      context.stroke();
      /*for (var i = 0; i < this._particles.length; i++) {
        if(this._particles[i].x < 350 && this._particles[i].x > 200 && this._particles[i].y > 400){
          this._particles[i].velocity.x *= this._particles[i].e;
          this._particles[i].y = 400 - this._particles[i].radius;
        }
      }*/
    }

    /*number()
    {
      let x = prompt('Adja meg a kezdő x-et' , '0');
      let y = prompt('Adja meg a kezdő y-t' , '0');
      let mag = prompt('Adja meg a magasságot' , '0');
      let szél = prompt('Adja meg a szélességet' , '0');
    }*/

    collisonWall()
    {
      for (var i = 0; i < this._particles.length; i++) {
          if(this._particles[i].x + this._particles[i].velocity.x > canvas.width - this._particles[i].radius)
          {
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = canvas.width - this._particles[i].radius;
          }
          if(this._particles[i].y + this._particles[i].velocity.y > canvas.height - this._particles[i].radius)
          {
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = canvas.height - this._particles[i].radius;
          }
          if(this._particles[i].x + this._particles[i].velocity.x < this._particles[i].radius)
          {
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = this._particles[i].radius;
          }
          if(this._particles[i].y + this._particles[i].velocity.y < this._particles[i].radius)
          {
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = this._particles[i].radius;
          }

        }


      }

    collisionCup(){

      var buffer = 0.1;

      var distX1 = 200 - 200;
      var distY1 = 200 - 400;
      var len1 = Math.sqrt( (distX1*distX1) + (distY1*distY1) );
      var distX2 = 200 - 350;
      var distY2 = 400 - 400;
      var len2 = Math.sqrt( (distX2*distX2) + (distY2*distY2) );
      var distX3 = 350 - 350;
      var distY3 = 200 - 400;
      var len3 = Math.sqrt( (distX3*distX3) + (distY3*distY3) );

        for (var i = 0; i < this._particles.length; i++){

          var dx1 = this._particles[i].x - 200;
          var dy1 = this._particles[i].y - 200;
          var dx2 = this._particles[i].x - 200;
          var dy2 = this._particles[i].y - 400;
          var d1 = Math.sqrt((dx1*dx1) + (dy1*dy1));
          var d2 = Math.sqrt((dx2*dx2) + (dy2*dy2));

          var dx3 = this._particles[i].x - 200;
          var dy3 = this._particles[i].y - 400;
          var dx4 = this._particles[i].x - 350;
          var dy4 = this._particles[i].y - 400;
          var d3 = Math.sqrt((dx3*dx3) + (dy3*dy3));
          var d4 = Math.sqrt((dx4*dx4) + (dy4*dy4));

          var dx5 = this._particles[i].x - 350;
          var dy5 = this._particles[i].y - 400;
          var dx6 = this._particles[i].x - 350;
          var dy6 = this._particles[i].y - 200;
          var d5 = Math.sqrt((dx5*dx5) + (dy5*dy5));
          var d6 = Math.sqrt((dx6*dx6) + (dy6*dy6));

          if (d1+d2 >= len1-buffer && d1+d2 <= len1+buffer) {
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = len1 - this._particles[i].radius;
          }

          if (d3+d4 >= len2-buffer && d3+d4 <= len2+buffer) {
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = len2 - this._particles[i].radius;
          }

          if (d5+d6 >= len3-buffer && d5+d6 <= len3+buffer) {
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = len3 - this._particles[i].radius;
          }

        }

    }




    collisionBall()
    {
      for (var i = 0; i < this._particles.length; i++) {
        for (var j = i+1; j < this._particles.length; j++) {

          if(this._particles[i].x != this._particles[j].x && this._particles[i].y != this._particles[j].y){
            if(this._particles[i].x + this._particles[i].radius + this._particles[j].radius > this._particles[j].x
              && this._particles[i].x < this._particles[j].x +  this._particles[i].radius + this._particles[j].radius
              && this._particles[i].y + this._particles[i].radius + this._particles[j].radius > this._particles[j].y
              && this._particles[i].y < this._particles[j].y +  this._particles[i].radius + this._particles[j].radius){

              let distance = this._particles[i].distance(this._particles[j]);

              if(distance < this._particles[i].radius + this._particles[j].radius)
              {
                let nx = (this._particles[j].x -  this._particles[i].x) / distance;
                let ny = (this._particles[j].y -  this._particles[i].y) / distance;
                let p = 2 * (this._particles[i].velocity.x * nx + this._particles[i].velocity.y * ny - this._particles[j].velocity.x * nx - this._particles[j].velocity.y * ny) / (this._particles[i].mass + this._particles[j].mass);
                let colPointX = ((this._particles[i].x * this._particles[j].radius) + (this._particles[j].x * this._particles[i].radius)) / (this._particles[i].radius + this._particles[j].radius);
                let colPointY = ((this._particles[i].y * this._particles[j].radius) + (this._particles[j].y * this._particles[i].radius)) / (this._particles[i].radius + this._particles[j].radius);

                this._particles[i].x = colPointX + this._particles[i].radius * (this._particles[i].x - this._particles[j].x) /distance;
                this._particles[i].y = colPointY + this._particles[i].radius * (this._particles[i].y - this._particles[j].y) /distance;
                this._particles[j].x = colPointX + this._particles[j].radius * (this._particles[j].x - this._particles[i].x) /distance;
                this._particles[j].y = colPointY + this._particles[j].radius * (this._particles[j].y - this._particles[i].y) /distance;

                this._particles[i].velocity.x -= p * this._particles[i].mass * nx;
					      this._particles[i].velocity.y -= p * this._particles[i].mass * ny;
					      this._particles[j].velocity.x += p * this._particles[j].mass * nx;
					      this._particles[j].velocity.y += p * this._particles[j].mass * ny;


              }

          }

        }

      }

    }
  }
}
