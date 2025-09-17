const form = document.getElementById("rsvp-form");
const responseMessage = document.getElementById("response-message");
const API_URL = "https://six0-aarslag-larry.onrender.com/api/rsvp";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const attending = document.querySelector(
    "input[name='attendance']:checked"
  )?.value;

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
      data.attending ? "Du kommer 🎉" : "Du kan dessverre ikke 😢"
    }`;
    responseMessage.classList.remove("hidden");
    form.reset();
  } catch (err) {
    responseMessage.textContent = "Kunne ikke sende svaret ditt. Prøv igjen.";
    responseMessage.classList.remove("hidden");
    console.error(err);
  }
});
