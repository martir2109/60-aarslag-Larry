const openEnvelopeButton = document.getElementById("open-envelope");
const envelope = document.querySelector(".envelope");

openEnvelopeButton.addEventListener("click", () => {
  envelope.classList.toggle("open"); // Toggle open/close

  // Change button text based on envelope state
  if (envelope.classList.contains("open")) {
    openEnvelopeButton.textContent = "Lukk konvolutt";
  } else {
    openEnvelopeButton.textContent = "Åpne konvolutt";
  }
});
