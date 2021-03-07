
class Grid
{
  constructor(row, column)
  {
    this.row = row;
    this.column = column;
  }
  get row()
  {
    return this._row;
  }

  set row(r)
  {
    this._row = r;
  }
  get column()
  {
    return this._column;
  }

  set column(c)
  {
    this._column = c;
  }

  initPixels()
  {
    let pixels = [];
    for (var i = 0; i < this.row; i++) {
      let row = [];
      for (var j = 0; j < this.column; j++) {
        row.push(0);
      }
      pixels.push(row);
    }
    return pixels;

  }

  updatePixels()
  {
    context.clearRect(0, 0, canvas.width, canvas.height);
    /*for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.column; j++) {


      }

    }*/




  }


  drawPixels()
  {
    let c = 500;
    let color = [];
    for(var i=0; i<c; i++)
    {
      let x = Math.floor(Math.random() * 60)+0;
      let y = Math.floor(Math.random() * 80)+0;
      color.push(x);
      color.push(y);
      console.log("x " +x + " y " + y);
      context.fillStyle = "blue";

      context.fillRect(y * 10, x * 10, 10, 10);

    }

    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.column; j++) {
        context.strokeStyle = "black";
        context.strokeRect(j*10, i*10, 10, 10);

      }

    }


  }



}
