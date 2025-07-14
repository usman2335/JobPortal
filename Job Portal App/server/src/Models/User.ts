import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["recruiter", "candidate", "admin"],
    default: "candidate",
  },
  registrationDate: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);
export { userModel };
