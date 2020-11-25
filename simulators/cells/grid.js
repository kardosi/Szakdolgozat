
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
    //context.clearRect(0, 0, canvas.width, canvas.height);

  }


  drawPixels()
  {


    for (var i = 0; i < this.row /2; i++) {
      for (var j = 0; j < this.column; j++){
        context.fillStyle = "lightblue";

        context.fillRect(j * 10, i * 10, 10, 10);
      }
    }
  }



}
