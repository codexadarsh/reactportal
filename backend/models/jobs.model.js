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
      type: String,
      enum: [
        "Under $50K",
        "$50K - $60K",
        "$60K - $70K",
        "$70K - $80K",
        "$80K - $90K",
        "$90K - $100K",
        "$100 - $110K",
        "$110K - $120K",
        "$120K - $130K",
        "$130K - $140K",
        "$140K - $150K",
        "$150K - $160K",
        "$160K - $170K",
        "$170K - $180K",
        "$180K - $190K",
        "Over $200K",
      ],
      required: [true, "Salary is required"],
      trim: true,
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
