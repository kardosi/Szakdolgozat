class Simulator
{
  constructor()
  {
    this._particles = this.createParticles(20);
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
}
