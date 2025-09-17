const form = document.getElementById("rsvp-form");
const responseMessage = document.getElementById("response-message");
const API_URL = "https://six0-aarslag-larry.onrender.com/api/rsvp";
const attendingList = document.getElementById("attending-list");
const notAttendingList = document.getElementById("not-attending-list");

async function loadRsvpData() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch RSVP data");

    const rsvps = await res.json();

    attendingList.innerHTML = "";
    notAttendingList.innerHTML = "";

    rsvps.forEach((rsvp) => {
      const li = document.createElement("li");
      li.textContent = rsvp.name;

      if (rsvp.attending === "ja") {
        attendingList.appendChild(li);
      } else {
        notAttendingList.appendChild(li);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

loadRsvpData();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;

  const attending = document.querySelector(
    "input[name='attendance']:checked"
  )?.value;

  if (!attending || (attending !== "ja" && attending !== "nei")) {
    responseMessage.textContent = "Vennligst velg enten 'Ja' eller 'Nei'.";
    responseMessage.classList.remove("hidden");
    return;
  }

  if (!attending) {
    responseMessage.textContent = "Vennligst velg om du kommer eller ikke.";
    responseMessage.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, attending }),
    });

    if (!res.ok) {
      throw new Error("Noe gikk galt 😢");
    }

    const data = await res.json();

    responseMessage.textContent = `${data.name}, svaret ditt er registrert: ${
      data.attending === "ja" ? "Du kommer 🎉" : "Du kan dessverre ikke 😢"
    }`;

    responseMessage.classList.remove("hidden");
    form.reset();

    setTimeout(() => {
      loadRsvpData();
      responseMessage.classList.add("hidden");
    }, 2000);
  } catch (err) {
    responseMessage.textContent = "Kunne ikke sende svaret ditt. Prøv igjen.";
    responseMessage.classList.remove("hidden");
    console.error(err);
  }
});
