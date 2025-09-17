import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Midlertidig lagring av RSVP-data
let rsvpList = [];

// POST endpoint for å lagre RSVP
app.post("/api/rsvp", (req, res) => {
  const { name, attending, allergies } = req.body; // add allergies
  if (!name) {
    return res.status(400).json({ error: "Navn er påkrevd" });
  }

  const rsvp = { name, attending, allergies: allergies || "" };
  rsvpList.push(rsvp);

  fs.writeFileSync("rsvp.json", JSON.stringify(rsvpList, null, 2));

  res.status(201).json(rsvp);
});

// GET endpoint for å hente RSVP-data
app.get("/api/rsvp", (req, res) => {
  res.json(rsvpList);
});

app.listen(PORT, () => {
  console.log(`RSVP server kjører på http://localhost:${PORT}`);
});
