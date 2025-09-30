import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { addFestival, getFestivals } from "./services/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello"});
})

app.get("/festivals", async (req, res) => {
  try {
    const festivals = await getFestivals();
    res.json({ festivals });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch festivals" });
  }
});

app.post("/festivals", async (req, res) => {
  console.log("Festival form submission received");
  console.log(req.body);
  
  try {
    const {
      festivalName,
      organizerName,
      email,
      phone,
      location,
      dates,
      expectedAttendees,
      sponsorBudget,
      description,
      website
    } = req.body;

    const festival = await addFestival({
      festivalName,
      organizerName,
      email,
      phone,
      location,
      dates,
      expectedAttendees,
      sponsorBudget,
      description,
      website,
    });

    res.status(201).json({ festival });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add festival" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

