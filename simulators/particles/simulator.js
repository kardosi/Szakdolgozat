


class Simulator
{
    constructor()
    {
      this._particles = this.createParticles(100);
    }




    update()
    {

      let dy = 0;
      let dx = 0;
      let fps = 1/60;
      let ag = 9.81;

      let gravity = document.getElementById("gravity").value;
	    let density = document.getElementById("density").value;
	    let drag = document.getElementById("drag").value;
      let mass = parseInt(document.getElementById("mass").value);




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


    			let ax = fx / mass;
    			let ay = (ag * gravity) + (fy / mass);


    			this._particles[i].velocity.x += ax * fps;
    			this._particles[i].velocity.y += ay * fps;


    			this._particles[i].x += this._particles[i].velocity.x * fps * 100;
    			this._particles[i].y += this._particles[i].velocity.y * fps * 100;
        }


      }

    	context.fillStyle = 'black';
    	context.font = "11pt Ariel";
    	context.fillText("Drag Coefficient: " + drag, 0, 32);
    	context.fillText("Density: " + density + " kg/m^3", 0, 48);
    	context.fillText("Gravity: " + gravity + " g", 0, 64);
      context.fillText("Mass: " + mass + " kg", 0, 80);

    }



    createParticles(nParticles)
    {
      let particles = [];
      for(var i=0; i<nParticles; i++)
      {
        let x = Math.floor(Math.random() * 780)+10;
        let y = Math.floor(Math.random() * 580)+10;
        let particle = new Particle(x, y, 10, 0.7);
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
      let x1 = parseInt(document.getElementById("x1").value);
      let x2 = parseInt(document.getElementById("x2").value);
      let x3 = parseInt(document.getElementById("x3").value);
      let x4 = parseInt(document.getElementById("x4").value);
      let y1 = parseInt(document.getElementById("y1").value);
      let y2 = parseInt(document.getElementById("y2").value);
      let y3 = parseInt(document.getElementById("y3").value);
      let y4 = parseInt(document.getElementById("y4").value);

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x3, y3);
      context.lineTo(x4, y4);
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

    collisionBall()
      {

        let mass = parseInt(document.getElementById("mass").value);

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
                  let p = 2 * (this._particles[i].velocity.x * nx + this._particles[i].velocity.y * ny - this._particles[j].velocity.x * nx - this._particles[j].velocity.y * ny) / (mass + mass);
                  let colPointX = ((this._particles[i].x * this._particles[j].radius) + (this._particles[j].x * this._particles[i].radius)) / (this._particles[i].radius + this._particles[j].radius);
                  let colPointY = ((this._particles[i].y * this._particles[j].radius) + (this._particles[j].y * this._particles[i].radius)) / (this._particles[i].radius + this._particles[j].radius);

                  this._particles[i].x = colPointX + this._particles[i].radius * (this._particles[i].x - this._particles[j].x) /distance;
                  this._particles[i].y = colPointY + this._particles[i].radius * (this._particles[i].y - this._particles[j].y) /distance;
                  this._particles[j].x = colPointX + this._particles[j].radius * (this._particles[j].x - this._particles[i].x) /distance;
                  this._particles[j].y = colPointY + this._particles[j].radius * (this._particles[j].y - this._particles[i].y) /distance;

                  this._particles[i].velocity.x -= p * mass * nx;
  					      this._particles[i].velocity.y -= p * mass * ny;
  					      this._particles[j].velocity.x += p * mass * nx;
  					      this._particles[j].velocity.y += p * mass * ny;


                }

            }

          }

        }

      }
    }

    collisionCup()
    {
      let x1 = parseInt(document.getElementById("x1").value);
      let x2 = parseInt(document.getElementById("x2").value);
      let x3 = parseInt(document.getElementById("x3").value);
      let x4 = parseInt(document.getElementById("x4").value);
      let y1 = parseInt(document.getElementById("y1").value);
      let y2 = parseInt(document.getElementById("y2").value);
      let y3 = parseInt(document.getElementById("y3").value);
      let y4 = parseInt(document.getElementById("y4").value);


      for (var i = 0; i < this._particles.length; i++) {
        let x = this._particles[i].x + this._particles[i].velocity.x;
        let y = this._particles[i].y + this._particles[i].velocity.y;

        let hit1 = this.lineCircle1(x1,y1, x2,y2, x,y,this._particles[i].radius);
        let hit2 = this.lineCircle2(x2,y2, x3,y3, x,y,this._particles[i].radius);
        let hit3 = this.lineCircle3(x3,y3, x4,y4, x,y,this._particles[i].radius);

        if (hit1)
        {
          this._particles[i].velocity.x *= this._particles[i].e;
          this._particles[i].x = x + this._particles[i].radius;
        }

        if (hit2)
        {
          this._particles[i].velocity.y *= this._particles[i].e;
          this._particles[i].y = y - this._particles[i].radius;
        }

        if (hit3)
        {
          this._particles[i].velocity.x *= this._particles[i].e;
          this._particles[i].x = x - this._particles[i].radius;
        }
      }
    }

    lineCircle1(x1, y1, x2, y2, cx, cy, r){

      /*let inside1 = this.pointCircle(x1,y1, cx,cy,r);
      let inside2 = this.pointCircle(x2,y2, cx,cy,r);
      if (inside1 || inside2) return true;*/

      let distX = x1 - x2;
      let distY = y1 - y2;
      let len = Math.sqrt( (distX*distX) + (distY*distY) );

      let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

      let closestX = x1 + (dot * (x2-x1));
      let closestY = y1 + (dot * (y2-y1));

      let onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
      if (!onSegment) return false;


      distX = closestX - cx;
      distY = closestY - cy;

      let distance = Math.sqrt( (distX*distX) + (distY*distY) );

      for (var i = 0; i < this._particles.length; i++) {

        let x = this._particles[i].x + this._particles[i].velocity.x;

        if(closestX>=x)
        {
          if (distance <= r) {
            return true;
          }
          return false;

        }

      }


    }


    lineCircle2(x1, y1, x2, y2, cx, cy, r){

      /*let inside1 = this.pointCircle(x1,y1, cx,cy,r);
      let inside2 = this.pointCircle(x2,y2, cx,cy,r);
      if (inside1 || inside2) return true;*/

      let distX = x1 - x2;
      let distY = y1 - y2;
      let len = Math.sqrt( (distX*distX) + (distY*distY) );

      let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

      let closestX = x1 + (dot * (x2-x1));
      let closestY = y1 + (dot * (y2-y1));

      let onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
      if (!onSegment) return false;

      distX = closestX - cx;
      distY = closestY - cy;

      let distance = Math.sqrt( (distX*distX) + (distY*distY) );

      for (var i = 0; i < this._particles.length; i++) {

        let y = this._particles[i].y + this._particles[i].velocity.y;

        if(closestY<=y)
        {
          if (distance <= r) {
            return true;
          }
          return false;
        }


      }

    }


    lineCircle3(x1, y1, x2, y2, cx, cy, r){

      /*let inside1 = this.pointCircle(x1,y1, cx,cy,r);
      let inside2 = this.pointCircle(x2,y2, cx,cy,r);
      if (inside1 || inside2) return true;*/

      let distX = x1 - x2;
      let distY = y1 - y2;
      let len = Math.sqrt( (distX*distX) + (distY*distY) );

      let dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

      let closestX = x1 + (dot * (x2-x1));
      let closestY = y1 + (dot * (y2-y1));

      let onSegment = this.linePoint(x1,y1,x2,y2, closestX,closestY);
      if (!onSegment) return false;

      distX = closestX - cx;
      distY = closestY - cy;

      let distance = Math.sqrt( (distX*distX) + (distY*distY) );

      for (var i = 0; i < this._particles.length; i++) {

        let x = this._particles[i].x + this._particles[i].velocity.x;

        if(closestX<=x)
        {
          if (distance <= r) {
            return true;
          }
          return false;
        }

      }


    }

    linePoint(x1, y1, x2, y2, px, py) {

      let dx1 = px - x1;
      let dy1 = py - y1;
      let dx2 = px - x2;
      let dy2 = py - y2;
      let d1 = Math.sqrt((dx1*dx1) + (dy1*dy1));
      let d2 = Math.sqrt((dx2*dx2) + (dy2*dy2));


      let lx = x1 - x2;
      let ly = y1 - y2;
      let lineLen = Math.sqrt((lx*lx) + (ly*ly));

      let buffer = 0.1;

      if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
        return true;
      }
      return false;
    }



    /*pointCircle(px, py, cx, cy, r) {

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
  }*/







}
