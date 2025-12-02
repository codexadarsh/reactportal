import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import Jobs from "./models/jobs.model.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

app.post("/jobs", async (req, res) => {
  try {
    const job = new Jobs(req.body);
    await job.save();
    res.status(201).send(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/jobs/:id", async (req, res) => {
  try {
    const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.send(job);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/jobs/:id", async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.send(job);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    const job = await Jobs.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.send("Job deleted successfully");
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
