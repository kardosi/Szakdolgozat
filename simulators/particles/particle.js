
class Particle extends Point
{
    constructor(x, y, radius)
    {
      super(x, y);
      this.radius = radius;
    }

    get radius()
    {
      return this._radius;
    }

    set radius(r)
    {
      this._radius = r;
    }

    draw()
    {

      context.fillStyle = 'blue';
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
    }

    /*utkozes()
    {
      var ix=0;
      var iy=0;
      for (var j = 1; j < pontokszama; j++) {
        if(pontokx[ix]<=(pontokx[j]+10) && pontokx[ix]>=(pontokx[j]-10))
        {

          if(pontoky[iy]<=(pontoky[j]+10) && pontoky[iy]>=(pontoky[j]-10))
          {
            console.log("ütközés x", pontokx[ix], pontokx[j]);
          }
          else console.log("nincs1", pontokx[ix], pontokx[j]);

        }
        else console.log("nincs2");
      }
      for (var j = 1; j < pontokszama; j++) {
        if(pontoky[iy]<=(pontoky[j]+10) && pontoky[iy]>=(pontoky[j]-10))
        {
          if(pontokx[ix]<=(pontokx[j]+10) && pontokx[ix]>=(pontokx[j]-10))
          {
            console.log("ütközés y", pontoky[iy], pontoky[j]);
          }
          else console.log("nincs3", pontoky[iy], pontoky[j]);

        }
        else console.log("nincs4");
      }

      while(ix<pontokszama)
      {
        ix++;
      }
      while(iy<pontokszama)
      {
        iy++;
      }
    }*/
}
