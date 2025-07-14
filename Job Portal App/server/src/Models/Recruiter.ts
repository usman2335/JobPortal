import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  postedJobs: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Job" }],
});

const recruiterModel = mongoose.model("Recruiter", recruiterSchema);
export { recruiterModel };
