const openEnvelopeButton = document.getElementById("open-envelope");
const envelope = document.querySelector(".envelope");

// Function to toggle envelope open/close
function toggleEnvelope() {
  envelope.classList.toggle("open");
  openEnvelopeButton.classList.toggle("active");
  openEnvelopeButton.textContent = envelope.classList.contains("open")
    ? "Lukk konvolutt"
    : "Åpne konvolutt";
}

// Button click
openEnvelopeButton.addEventListener("click", toggleEnvelope);

// Envelope click
envelope.addEventListener("click", toggleEnvelope);
