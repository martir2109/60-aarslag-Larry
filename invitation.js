const openEnvelopeButton = document.getElementById("open-envelope");
const envelope = document.querySelector(".envelope");

openEnvelopeButton.addEventListener("click", () => {
  envelope.classList.toggle("open");
  openEnvelopeButton.classList.toggle("active"); // toggle button state
  openEnvelopeButton.textContent = envelope.classList.contains("open")
    ? "Lukk konvolutt"
    : "Åpne konvolutt";
});
