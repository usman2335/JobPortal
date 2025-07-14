import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // will change to candidate model later
    required: true,
  },
  resume: { type: String, required: true }, // url to resume or however the aws file upload is handled
  status: {
    type: String,
    enum: [
      "applied",
      "under review",
      "interview scheduled",
      "rejected",
      "accepted",
    ],
    default: "applied",
  },
  appliedDate: { type: Date, default: Date.now },
});

const applicationModel = mongoose.model("Application", applicationSchema);
export { applicationModel };
