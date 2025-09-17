const form = document.getElementById("rsvp-form");
const responseMessage = document.getElementById("response-message");
const API_URL = "https://six0-aarslag-larry.onrender.com/api/rsvp";
const attendingList = document.getElementById("attending-list");
const notAttendingList = document.getElementById("not-attending-list");

const attendanceRadios = document.querySelectorAll("input[name='attendance']");
const allergiesRadios = document.querySelectorAll(
  "input[name='allergies-yesno']"
);
const allergiesQuestionContainer = document.getElementById(
  "allergies-question-container"
);
const allergiesContainer = document.getElementById("allergies-container");
const allergiesInput = document.getElementById("allergies");

// Hide allergies question and input by default
allergiesQuestionContainer.classList.add("hidden");
allergiesContainer.classList.add("hidden");
allergiesInput.disabled = true;

// Show/hide "Har du allergier?" based on attendance
attendanceRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "ja" && radio.checked) {
      allergiesQuestionContainer.classList.remove("hidden");
    } else {
      allergiesQuestionContainer.classList.add("hidden");

      // Clear previously selected allergies options and input
      allergiesRadios.forEach((r) => (r.checked = false));
      allergiesContainer.classList.add("hidden");
      allergiesInput.value = "";
      allergiesInput.disabled = true;
    }
  });
});

// Show/hide allergy input based on "ja"/"nei" for allergies
allergiesRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "ja" && radio.checked) {
      allergiesContainer.classList.remove("hidden");
      allergiesInput.disabled = false;
    } else if (radio.value === "nei" && radio.checked) {
      allergiesContainer.classList.add("hidden");
      allergiesInput.value = "";
      allergiesInput.disabled = true;
    }
  });
});

// Load RSVP data and populate lists
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
      if (rsvp.allergies) {
        li.textContent += ` (Allergier: ${rsvp.allergies})`;
      }

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

// Initial load
loadRsvpData();

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const attending = document.querySelector(
    "input[name='attendance']:checked"
  )?.value;

  // Gather selected checkboxes
  const selectedAllergies = Array.from(
    document.querySelectorAll("input[name='allergi']:checked")
  ).map((cb) => cb.value);

  if (allergiesInput.value.trim() !== "") {
    selectedAllergies.push(allergiesInput.value.trim());
  }

  const allergies = selectedAllergies.join(", ");

  // Validation
  if (!attending || (attending !== "ja" && attending !== "nei")) {
    responseMessage.textContent = "Vennligst velg enten 'Ja' eller 'Nei'.";
    responseMessage.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, attending, allergies }),
    });

    if (!res.ok) throw new Error("Noe gikk galt 😢");

    const data = await res.json();

    responseMessage.textContent = `${data.name}, svaret ditt er registrert: ${
      data.attending === "ja" ? "Du kommer 🎉" : "Du kan dessverre ikke 😢"
    }`;
    responseMessage.classList.remove("hidden");
    form.reset();

    // Hide allergy question and input
    allergiesQuestionContainer.classList.add("hidden");
    allergiesContainer.classList.add("hidden");
    allergiesInput.value = "";
    allergiesInput.disabled = true;

    // Clear radio selections
    attendanceRadios.forEach((r) => (r.checked = false));
    allergiesRadios.forEach((r) => (r.checked = false));
    document
      .querySelectorAll("input[name='allergi']")
      .forEach((cb) => (cb.checked = false));

    allergiesInput.disabled = true;

    // Clear checkboxes
    allergiesRadios.forEach((r) => (r.checked = false));
    document
      .querySelectorAll("input[name='allergi']")
      .forEach((cb) => (cb.checked = false));

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
