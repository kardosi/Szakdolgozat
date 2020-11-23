


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
      var fps = 1/60;
      let ag = 9.81;





      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      for (var i = 0; i < this._particles.length; i++) {
        //let dx = Math.random() * 6-3; //brown
        //let dy = Math.random() * 6-3;
        dy += gravity;

        this._particles[i].translate(dx, dy);



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
        let particle = new Particle(x, y, 10, 0.9, 10);
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
