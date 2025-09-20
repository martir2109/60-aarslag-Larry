const openEnvelopeButton = document.getElementById("open-envelope");
const envelope = document.querySelector(".envelope");
const balloonContainer = document.getElementById("balloon-container");

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Balloon {
  constructor() {
    this.el = document.createElement("div");
    this.el.className = "balloon";
    this.el.style.position = "absolute";

    const hue = random(0, 360);
    const saturation = random(30, 50);
    const lightness = random(70, 85);
    this.el.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // Use container width/height after it's visible
    this.el.style.bottom = `0px`;
    this.el.style.left = `${random(0, balloonContainer.offsetWidth - 50)}px`;

    this.speed = random(1, 3);
    balloonContainer.appendChild(this.el);
  }

  update() {
    let currentBottom = parseFloat(this.el.style.bottom);
    currentBottom += this.speed;
    if (currentBottom > balloonContainer.offsetHeight + 100) {
      currentBottom = -100;
      this.el.style.left = `${random(0, balloonContainer.offsetWidth - 50)}px`;
    }
    this.el.style.bottom = `${currentBottom}px`;
  }
}

let balloons = [];
let balloonAnimationRunning = false;

function createBalloons() {
  balloons = [];
  const count = 10;
  for (let i = 0; i < count; i++) {
    balloons.push(new Balloon());
  }
}

function animateBalloons() {
  if (!balloonAnimationRunning) return;
  balloons.forEach((b) => b.update());
  requestAnimationFrame(animateBalloons);
}

function toggleEnvelope() {
  envelope.classList.toggle("open");
  openEnvelopeButton.classList.toggle("active");
  openEnvelopeButton.textContent = envelope.classList.contains("open")
    ? "Lukk konvolutt"
    : "Åpne konvolutt";

  if (envelope.classList.contains("open")) {
    balloonContainer.style.display = "block";

    if (!balloonAnimationRunning) {
      createBalloons(); // Create after envelope opens
      balloonAnimationRunning = true;
      animateBalloons();
    }
  } else {
    balloonContainer.style.display = "none";
    balloonContainer.innerHTML = ""; // Remove balloons when closed
    balloonAnimationRunning = false;
  }
}

// Button click
openEnvelopeButton.addEventListener("click", toggleEnvelope);
envelope.addEventListener("click", toggleEnvelope);
