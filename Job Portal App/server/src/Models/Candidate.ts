import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  resumeUrl: { type: String }, // depends if user will upload resume for each job or upload once and store in profile
  profileSummary: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  country: { type: String },
  gender: { enum: ["male", "female", "other"] },
  education: [
    {
      degree: String,
      institution: String,
      year: Number,
    },
  ],
  experience: [
    { company: String, role: String, years: Number, description: String },
  ],
  skills: [String],
  linkedin: { type: String },
  github: { type: String },
  portfolio: { type: String },
});

const candidateModel = mongoose.model("Candidate", candidateSchema);
export { candidateModel };
