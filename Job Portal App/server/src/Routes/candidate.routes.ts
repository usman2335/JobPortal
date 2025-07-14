import express from "express";
import {
  checkCandidate,
  createCandidate,
} from "../Controllers/candidate.controller";
import { authMiddleware } from "../Middleware/auth.middleware";
const router = express.Router();

router.post("/create-candidate", authMiddleware, createCandidate);
router.post("/check-candidate/:userId", authMiddleware, checkCandidate);

export default router;
