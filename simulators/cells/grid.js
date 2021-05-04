
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

  






}
