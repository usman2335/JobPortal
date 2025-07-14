import { Request, Response } from "express";
import { candidateModel } from "../Models/Candidate";

export const createCandidate = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      phone,
      address,
      dateOfBirth,
      country,
      gender,
      education,
      experience,
      resumeUrl,
      profileSummary,
      skills,
      linkedin,
      github,
      portfolio,
    } = req.body;
    const userId = req.user.userId;

    const existing = await candidateModel.findOne({ userId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Candidate profile already exists" });
    }

    const parsedDOB = new Date(dateOfBirth);
    if (isNaN(parsedDOB.getTime())) {
      return res.status(400).json({ message: "Invalid date of birth" });
    }
    const newCandidate = new candidateModel({
      userId,
      phone,
      address,
      dateOfBirth: parsedDOB,
      country,
      gender,
      education,
      experience,
      resumeUrl,
      profileSummary,
      skills,
      linkedin,
      github,
      portfolio,
    });

    await newCandidate.save();

    return res
      .status(201)
      .json({ message: "Candidate profile created successfully" });
  } catch (error) {
    console.error("Error creating candidate profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkCandidate = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  console.log(userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const exists = await candidateModel.exists({ userId });

  if (exists) {
    return res.status(200).json({ exists: true });
  } else {
    return res.status(200).json({ exists: false });
  }
};
