class Pixel
{
  constructor(x, y, width, height, gravitySpeed, e, mass)
  {
    this.x = x;
    this.y = y;
    this.color = "blue";
    this.width = width;
    this.height = height;
    this.gravitySpeed = gravitySpeed;
    this.velocity = {x: 0, y: 0};
    this.e = -e;
    this.mass = mass;
    this.area = this.width * this.height / 10000;
  }

  get x()
  {
      return this._x;
  }

  set x(x)
  {
    this._x = x;
  }

  get y()
  {
      return this._y;
  }

  set y(y)
  {
    this._y = y;
  }

  get color()
  {
    return this._color;
  }

  set color(c)
  {
    this._color = c;
  }

  get width()
  {
      return this._width;
  }

  set width(w)
  {
    this._width = w;
  }

  get height()
  {
      return this._height;
  }

  set height(h)
  {
    this._height = h;
  }
  get gravitySpeed()
  {
      return this._gravitySpeed;
  }

  set gravitySpeed(gS)
  {
    this._gravitySpeed = gS;
  }

  draw()
  {

      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);


  }

  distance(other)
  {
      let dx = other.x - this._x;
      let dy = other.y - this._y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      return distance;
  }

}
