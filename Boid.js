class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.5;
        this.maxSpeed = 3;
        this.perceptionRadius = 50;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) { 
            this.position.y = height;
        }

    }

    align(boids) {
        let perceptionRadius = this.perceptionRadius;
        let steering = createVector();
        let total = 0;

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            //steering.velocity
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = this.perceptionRadius;
        let steering = createVector();
        let total = 0;

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

            if (other != this && d < perceptionRadius) {
                steering.add(other.posiiton);
                total++
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        this.acceleration.mult(0);
        let alignment = this.align(boids);
        //let cohesion = this.cohesion(boids);
        this.acceleration.add(alignment);
        //this.acceleration.add(cohesion);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration)
    }

    show() {
        strokeWeight(10);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}