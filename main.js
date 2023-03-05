const school = [];
let fishNum = 100;

function setup() {
  background(0);
  createCanvas(1000, 500);
  for (let i=0; i < fishNum; i++) {
    school.push(new Boid());
  }

}

function draw() {
  background(50);

  for (let fish of school) {
    fish.edges();
    fish.flock(school);
    fish.update();
    fish.show();
  }
}