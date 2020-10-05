
class Particle
{

  get x()
  {
      return this._x;
  }

  get y()
  {
      return this._y;
  }

  draw()
  {
    for(var i=0; i< pontokszama; i++) {


      $('canvas').drawArc({
      name: "kor"+db,
      strokeStyle: 'black',
      fillStyle: 'blue',
      strokeWidth: 2,
      x: pontokx[i], y: pontoky[i],
      radius: 5
      });

      $('canvas').drawText({
      strokeStyle: 'black',
      strokeWidth: 1,
      x: pontokx[i], y: pontoky[i]+15,
      fontSize: 12,
      fontFamily: 'Verdana, sans-serif',
      text:pontokx[i]

      });
      $('canvas').drawText({
      strokeStyle: 'black',
      strokeWidth: 1,
      x: pontokx[i], y: pontoky[i]+30,
      fontSize: 12,
      fontFamily: 'Verdana, sans-serif',
      text:pontoky[i]

    });
    db++;
    }
  }
  utozes()
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
  }
}
