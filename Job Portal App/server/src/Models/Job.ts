import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // requirements: [{ type: String, required: true }],
  salaryRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  location: { type: String, required: true },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship", "remote"],
    required: true,
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // will change to recruiter model later
    required: true,
  },
  isActive: { type: Boolean, default: true },
  deadline: { type: String, required: true },
  workLocation: { type: String, required: true },
});

const jobModel = mongoose.model("Job", jobSchema);
export { jobModel };
