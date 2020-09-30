class Szim
{
  random()
  {
    for(var i=0; i<pontokszama; i++)
    {
      pontokx[i] = Math.floor(Math.random() * 1005)+10;
      pontoky[i] = Math.floor(Math.random() * 545)+10;
      console.log("x" ,pontokx[i]);
      console.log("y" ,pontoky[i]);
    }
  }
}
