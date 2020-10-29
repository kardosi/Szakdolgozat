


class Simulator
{
  constructor()
  {
    this._particles = this.createParticles(20);
  }


/*
    resize(width, height)
    {
        this._width = width;
        this._height = height;
        this.updatePanels(width, height);
        this.draw(this._context);
    }*/

    updatePanels(width, height)
    {
      
    }





    createParticles(nParticles)
    {
      let particles = [];
      for(var i=0; i<nParticles; i++)
      {
        let x = Math.floor(Math.random() * 1005)+10;
        let y = Math.floor(Math.random() * 545)+10;
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
