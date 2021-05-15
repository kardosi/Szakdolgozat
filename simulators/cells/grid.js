
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


}
