


class Simulator
{
    constructor()
    {
      this._particles = this.createParticles(20);
    }


  

    update()
    {
      context.clearRect(0,0, context.canvas.width,context.canvas.height);
      this._particles = this.createParticles(20);

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
      for (let point of this._particles) {
        let distance = point.distance(this._particles);
        if(distance < 5)
        {
          console.log("ütközés");
        }
      }
    }
}
