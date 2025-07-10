import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract", "Freelance"],
      required: [true, "Job type is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 2,
    },
    salary: {
      type: Number,
      min: [0, "Salary must be positive"],
    },
    company: {
      name: {
        type: String,
        required: [true, "Company name is required"],
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      contactEmail: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
      },
      contactPhone: {
        type: Number,
        match: [/^[0-9]{10}$/, "Enter a valid 10-digit phone number"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
