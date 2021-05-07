
class Particle extends Point
{
    constructor(x, y, radius, e)
    {
      super(x, y);
      this.radius = radius;
      this.color = "lightblue";
      this.velocity = {x: 0, y: 0};
      this.e = -e;
      this.area = (Math.PI * radius * radius) / 10000;
    }

    get radius()
    {
      return this._radius;
    }

    set radius(r)
    {
      this._radius = r;
    }

    get color()
    {
      return this._color;
    }

    set color(c)
    {
      this._color = c;
    }

    draw()
    {

      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill();
    }

}
