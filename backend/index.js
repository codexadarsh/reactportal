import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import Jobs from "./models/jobs.model.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/jobs", async (req, res) => {
  try {
    const job = new Jobs(req.body);
    await job.save();
    res.status(201).send(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
