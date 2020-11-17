


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
      context.clearRect(0,0, context.canvas.width,context.canvas.height);
      for (var i = 0; i < this._particles.length; i++) {
        let dx = 0;//Math.random() * 6-3;
        //let dy = Math.random() * 6-3;
        dy += gravity;
        this._particles[i].translate(dx, dy);

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
    collision()
    {
      for (var i = 0; i < this._particles.length; i++) {
        for (var j = i+1; j < this._particles.length; j++) {
          let distance = this._particles[i].distance(this._particles[j]);
          if(distance < 5)
          {
            this._particles[i].color = "red";
            this._particles[j].color = "red";
          }

        }
      }
    }
}
