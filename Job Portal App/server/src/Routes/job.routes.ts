import express from "express";
import { authMiddleware } from "../Middleware/auth.middleware";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../Controllers/job.controller";
const router = express.Router();

router.post("/create-job", authMiddleware, createJob);
router.get("/get-jobs", authMiddleware, getAllJobs);
router.get("/get-job/:id", authMiddleware, getJobById);
router.delete("/delete-job/:id", authMiddleware, deleteJob);
router.put("/update-job/:id", authMiddleware, updateJob);

export default router;
