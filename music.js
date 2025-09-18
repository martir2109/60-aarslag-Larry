const music = document.getElementById("background-music");
const playPauseBtn = document.getElementById("play-pause");
const icon = playPauseBtn.querySelector("i");
const message = document.querySelector(".music-message");

playPauseBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    icon.className = "bi bi-pause-circle-fill";
    message.style.display = "none";
    playPauseBtn.classList.remove("paused");
  } else {
    music.pause();
    icon.className = "bi bi-play-circle-fill";
    message.style.display = "block";
    playPauseBtn.classList.add("paused");
    message.classList.add("paused");
  }
});

document.addEventListener(
  "click",
  () => {
    music.muted = false;
    music.play();
    message.style.display = "none";
    icon.className = "bi bi-pause-circle-fill";
  },
  { once: true }
);
