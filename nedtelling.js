// Sett en dato i fremtiden
const targetDate = new Date("Dec 1, 2025 23:59:59").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    document.getElementById("timer").innerHTML = "Tiden er ute!";
    return;
  }

  // Beregning
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  // Oppdater HTML
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
}

// Oppdater hvert sekund
setInterval(updateCountdown, 1000);
updateCountdown(); // kall med en gang
