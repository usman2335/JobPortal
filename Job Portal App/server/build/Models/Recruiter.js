"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const recruiterSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    location: { type: String, required: true },
    postedJobs: [{ type: mongoose_1.default.SchemaTypes.ObjectId, ref: "Job" }],
});
const recruiterModel = mongoose_1.default.model("Recruiter", recruiterSchema);
exports.recruiterModel = recruiterModel;
