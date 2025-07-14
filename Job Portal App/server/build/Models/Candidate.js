"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const candidateSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    resumeUrl: { type: String }, // depends if user will upload resume for each job or upload once and store in profile
    profileSummary: { type: String },
    experience: [
        { company: String, role: String, years: Number, description: String },
    ],
    skills: [String],
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
});
const candidateModel = mongoose_1.default.model("Candidate", candidateSchema);
exports.candidateModel = candidateModel;
