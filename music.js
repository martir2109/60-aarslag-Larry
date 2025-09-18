const music = document.getElementById("background-music");

// Unmute and play on first click anywhere
document.addEventListener(
  "click",
  () => {
    music.muted = false;
    music.play();
  },
  { once: true } // runs only once
);
