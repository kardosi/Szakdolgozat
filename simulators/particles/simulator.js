


class Simulator
{
    constructor()
    {
      this._particles = this.createParticles(500);
    }




    update()
    {

      let gravity = 0.05;
      let dy = 0;
      let dx = 0;
      let drag = 0.47;
      let density = 1.22;
      let fps = 1/60;
      let ag = 9.81;



      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      for (var i = 0; i < this._particles.length; i++) {
        //let dx = Math.random() * 6-3; //brown
        //let dy = Math.random() * 6-3;
        /*dy += gravity;

        this._particles[i].translate(dx, dy);*/



        if(i != this._particles.length){
          let fx = -0.5 * drag * density * this._particles[i].area * this._particles[i].velocity.x * this._particles[i].velocity.x * (this._particles[i].velocity.x / Math.abs(this._particles[i].velocity.x));
    			let fy = -0.5 * drag * density * this._particles[i].area * this._particles[i].velocity.y * this._particles[i].velocity.y * (this._particles[i].velocity.y / Math.abs(this._particles[i].velocity.y));

          fx = (isNaN(fx)? 0 : fx);
    			fy = (isNaN(fy)? 0 : fy);


    			let ax = fx / this._particles[i].mass;
    			let ay = (ag * gravity) + (fy / this._particles[i].mass);


    			this._particles[i].velocity.x += ax * fps;
    			this._particles[i].velocity.y += ay * fps;


    			this._particles[i].x += this._particles[i].velocity.x * fps * 100;
    			this._particles[i].y += this._particles[i].velocity.y * fps * 100;
        }


      }

    }



    createParticles(nParticles)
    {
      let particles = [];
      for(var i=0; i<nParticles; i++)
      {
        let x = Math.floor(Math.random() * 780)+10;
        let y = Math.floor(Math.random() * 580)+10;
        let particle = new Particle(x, y, 10, 0.7, 10);
        particles.push(particle);

      }
      return particles;
    }
    draw()
    {
      for (let particle of this._particles) {
        particle.draw();
      }

    }
    drawCup()
    {


      context.beginPath();
      context.moveTo(200, 200);
      context.lineTo(200, 400);
      context.lineTo(350, 400);
      context.lineTo(350, 200);
      context.stroke();


    }



    collisonWall()
    {
      for (var i = 0; i < this._particles.length; i++) {
          if(this._particles[i].x + this._particles[i].velocity.x > canvas.width - this._particles[i].radius)
          {
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = canvas.width - this._particles[i].radius;
          }
          if(this._particles[i].y + this._particles[i].velocity.y > canvas.height - this._particles[i].radius)
          {
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = canvas.height - this._particles[i].radius;
          }
          if(this._particles[i].x + this._particles[i].velocity.x < this._particles[i].radius)
          {
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = this._particles[i].radius;
          }
          if(this._particles[i].y + this._particles[i].velocity.y < this._particles[i].radius)
          {
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = this._particles[i].radius;
          }

        }


      }

    collisionCup()
    {

      for (var i = 0; i < this._particles.length; i++) {
        let x = this._particles[i].x + this._particles[i].velocity.x;
        let y = this._particles[i].y + this._particles[i].velocity.y;

        let hit1 = this.lineCircle(200,200, 200,400, x,y,this._particles[i].radius);
        let hit2 = this.lineCircle(200,400, 350,400, x,y,this._particles[i].radius);
        let hit3 = this.lineCircle(350,400, 350,200, x,y,this._particles[i].radius);
        if (hit1)
        {
          if(x<=200){
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = 200 - this._particles[i].radius;
          }
          else{
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = 200 + this._particles[i].radius;
          }


        }
        if (hit2)
        {
          if(y>=400){
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = 400 + this._particles[i].radius;
          }
          else{
            this._particles[i].velocity.y *= this._particles[i].e;
            this._particles[i].y = 400 - this._particles[i].radius;
          }

        }
        if (hit3)
        {
          if(x>=350){
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = 350 + this._particles[i].radius;
          }
          else{
            this._particles[i].velocity.x *= this._particles[i].e;
            this._particles[i].x = 350 - this._particles[i].radius;
          }

        }
      }

    }

    lineCircle(x1, y1, x2, y2, cx, cy, r){


        // is either end INSIDE the circle?
      // if so, return true immediately
      let inside1 = this.pointCircle(x1,y1, cx,cy,r);
      let inside2 = this.pointCircle(x2,y2, cx,cy,r);
      if (inside1 || inside2) return true;

      // get length of the line
      let distX = x1 - x2;
      let distY = y1 - y2;
      let len = Math.sqrt( (distX*distX) + (distY*distY) );

      // get dot product of the line and circle
      let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

      // find the closest point on the line
      let closestX = x1 + (dot * (x2-x1));
      let closestY = y1 + (dot * (y2-y1));

      // is this point actually on the line segment?
      // if so keep going, but if not, return false
      let onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
      if (!onSegment) return false;


      // get distance to closest point
      distX = closestX - cx;
      distY = closestY - cy;
      let distance = Math.sqrt( (distX*distX) + (distY*distY) );

      if (distance <= r) {
        return true;
      }
      return false;


    }

    pointCircle(px, py, cx, cy, r) {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem

    let distX = px - cx;
    let distY = py - cy;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
      return true;
    }
    return false;
  }

  linePoint(x1, y1, x2, y2, px, py) {

    // get distance from the point to the two ends of the line

    let dx1 = px - x1;
    let dy1 = py - y1;
    let dx2 = px - x2;
    let dy2 = py - y2;
    let d1 = Math.sqrt((dx1*dx1) + (dy1*dy1));
    let d2 = Math.sqrt((dx2*dx2) + (dy2*dy2));

    // get the length of the line
    let lx = x1 - x2;
    let ly = y1 - y2;
    let lineLen = Math.sqrt((lx*lx) + (ly*ly));

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    let buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
  }




    collisionBall()
    {
      for (var i = 0; i < this._particles.length; i++) {
        for (var j = i+1; j < this._particles.length; j++) {

          if(this._particles[i].x != this._particles[j].x && this._particles[i].y != this._particles[j].y){
            if(this._particles[i].x + this._particles[i].radius + this._particles[j].radius > this._particles[j].x
              && this._particles[i].x < this._particles[j].x +  this._particles[i].radius + this._particles[j].radius
              && this._particles[i].y + this._particles[i].radius + this._particles[j].radius > this._particles[j].y
              && this._particles[i].y < this._particles[j].y +  this._particles[i].radius + this._particles[j].radius){

              let distance = this._particles[i].distance(this._particles[j]);

              if(distance < this._particles[i].radius + this._particles[j].radius)
              {
                let nx = (this._particles[j].x -  this._particles[i].x) / distance;
                let ny = (this._particles[j].y -  this._particles[i].y) / distance;
                let p = 2 * (this._particles[i].velocity.x * nx + this._particles[i].velocity.y * ny - this._particles[j].velocity.x * nx - this._particles[j].velocity.y * ny) / (this._particles[i].mass + this._particles[j].mass);
                let colPointX = ((this._particles[i].x * this._particles[j].radius) + (this._particles[j].x * this._particles[i].radius)) / (this._particles[i].radius + this._particles[j].radius);
                let colPointY = ((this._particles[i].y * this._particles[j].radius) + (this._particles[j].y * this._particles[i].radius)) / (this._particles[i].radius + this._particles[j].radius);

                this._particles[i].x = colPointX + this._particles[i].radius * (this._particles[i].x - this._particles[j].x) /distance;
                this._particles[i].y = colPointY + this._particles[i].radius * (this._particles[i].y - this._particles[j].y) /distance;
                this._particles[j].x = colPointX + this._particles[j].radius * (this._particles[j].x - this._particles[i].x) /distance;
                this._particles[j].y = colPointY + this._particles[j].radius * (this._particles[j].y - this._particles[i].y) /distance;

                this._particles[i].velocity.x -= p * this._particles[i].mass * nx;
					      this._particles[i].velocity.y -= p * this._particles[i].mass * ny;
					      this._particles[j].velocity.x += p * this._particles[j].mass * nx;
					      this._particles[j].velocity.y += p * this._particles[j].mass * ny;


              }

          }

        }

      }

    }
  }
}
