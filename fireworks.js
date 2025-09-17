const canvas = document.getElementById("fireworks-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height;
    this.targetY = random(50, canvas.height / 2);
    this.particles = [];
    this.exploded = false;
  }
  update() {
    if (!this.exploded) {
      this.y -= 5;
      if (this.y <= this.targetY) this.explode();
    }
    this.particles.forEach((p) => p.update());
    this.particles = this.particles.filter((p) => !p.done);
  }
  explode() {
    this.exploded = true;
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }
  draw() {
    if (!this.exploded) {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    this.particles.forEach((p) => p.draw());
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.alpha = 1;
    this.done = false;
    this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // gravity
    this.alpha -= 0.02;
    if (this.alpha <= 0) this.done = true;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  fireworks.forEach((f) => {
    f.update();
    f.draw();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
