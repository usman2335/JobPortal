"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String, required: true }],
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User", // will change to recruiter model later
        required: true,
    },
    isActive: { type: Boolean, default: true },
});
const jobModel = mongoose_1.default.model("Job", jobSchema);
exports.jobModel = jobModel;
