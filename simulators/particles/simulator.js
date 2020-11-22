


class Simulator
{
    constructor()
    {
      this._particles = this.createParticles(20);
    }




    update()
    {
      let gravity = 0.05;
      let dy =0;
      let dx = 0;
      let drag = 0.47;
      let density = 1.22;
      var fps = 1/60;
      var dt = fps * 1000;
      let ag = 9.81;
      let Cd = 0.47;
      let rho = 1.22;




      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      for (var i = 0; i < this._particles.length; i++) {
        //let dx = Math.random() * 6-3;
        //let dy = Math.random() * 6-3;
        dy += gravity;
        this._particles[i].translate(dx, dy);

        this._particles[i].velocity.x = this._particles[i].x-dx;
		    this._particles[i].velocity.y = this._particles[i].y-dy;

        /*console.log(this._particles[1].velocity.x);
        console.log(this._particles[1].velocity.y);*/


        /*if(i == this._particles.length - 1){
          let fx = -0.5 * drag * density * this._particles[i].area * this._particles[i].velocity.x * this._particles[i].velocity.x * (this._particles[i].velocity.x / Math.abs(this._particles[i].velocity.x));
    			let fy = -0.5 * drag * density * this._particles[i].area * this._particles[i].velocity.y * this._particles[i].velocity.y * (this._particles[i].velocity.y / Math.abs(this._particles[i].velocity.y));



    			let ax = fx / this._particles[i].mass;
    			let ay = (ag * gravity) + (fy / this._particles[i].mass);


    			this._particles[i].velocity.x += ax * fps;
    			this._particles[i].velocity.y += ay * fps;


    			this._particles[i].x += this._particles[i].velocity.x * fps * 100;
    			this._particles[i].y += this._particles[i].velocity.y * fps * 100;
        }*/


      }

    }



    createParticles(nParticles)
    {
      let particles = [];
      for(var i=0; i<nParticles; i++)
      {
        let x = Math.floor(Math.random() * 780)+10;
        let y = Math.floor(Math.random() * 580)+10;
        let particle = new Particle(x, y, 5);
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

    collisonWall()
    {
      for (var i = 0; i < this._particles.length; i++) {
          if(this._particles[i].x > canvas.width - this._particles[i].radius)
          {
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = canvas.width - this._particles[i].radius;
          }
          if(this._particles[i].y  > canvas.height - this._particles[i].radius)
          {
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = canvas.height - this._particles[i].radius;
          }
          if(this._particles[i].x < this._particles[i].radius)
          {
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = this._particles[i].radius;
          }
          if(this._particles[i].y < this._particles[i].radius)
          {
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = this._particles[i].radius;
          }


      }


    }
    collisionBall()
    {
      for (var i = 0; i < this._particles.length; i++) {
        for (var j = i+1; j < this._particles.length; j++) {
          let distance = this._particles[i].distance(this._particles[j]);

          if(this._particles[i].x != this._particles[j].x && this._particles[i].y != this._particles[j].y){
            if(this._particles[i].x + this._particles[i].radius + this._particles[j].radius > this._particles[j].x
              && this._particles[i].x < this._particles[j].x +  this._particles[i].radius + this._particles[j].radius
              && this._particles[i].y + this._particles[i].radius + this._particles[j].radius > this._particles[j].y
              && this._particles[i].y < this._particles[j].y +  this._particles[i].radius + this._particles[j].radius){

              if(distance < this._particles[i].radius + this._particles[j].radius)
              {
                /*this._particles[i].color = "red";
                this._particles[j].color = "red";*/
                let nx = (this._particles[j].x -  this._particles[i].x) / distance;
                let ny = (this._particles[j].y -  this._particles[i].y) / distance;
                var p = 2 * (this._particles[i].velocity.x * nx + this._particles[i].velocity.y * ny - this._particles[j].velocity.x * nx - this._particles[j].velocity.y * ny) / (this._particles[i].mass + this._particles[j].mass);
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
