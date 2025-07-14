"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const applicationSchema = new mongoose_1.default.Schema({
    jobId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    candidateId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const applicationModel = mongoose_1.default.model("Application", applicationSchema);
exports.applicationModel = applicationModel;
