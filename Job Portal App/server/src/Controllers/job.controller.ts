import { Request, Response } from "express";
import { jobModel } from "../Models/Job";

export const createJob = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, salaryRange, location, jobType } = req.body;
    const recruiterId = req.user.userId;

    const newJob = new jobModel({
      title,
      description,
      salaryRange,
      location,
      jobType,
      recruiterId,
    });
    await newJob.save();
    return res.status(201).json({ message: "New job posted successfully" });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllJobs = async (req: Request, res: Response): Promise<any> => {
  try {
    const recruiterId = req.user.userId;
    const jobs = await jobModel
      .find({ recruiterId })
      .populate("recruiterId", "name email");
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/job/delete-job/:id

export const deleteJob = async (req: Request, res: Response): Promise<any> => {
  try {
    const jobId = req.params.id;
    await jobModel.findByIdAndDelete(jobId);
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<any> => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<any> => {
  try {
    const jobId = req.params.id;
    const recruiterId = req.user.userId;

    const job = await jobModel.findOne({ _id: jobId, recruiterId });

    if (!job) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    const { title, description, salaryRange, location, jobType } = req.body;

    job.title = title || job.title;
    job.description = description || job.description;
    job.salaryRange = salaryRange || job.salaryRange;
    job.location = location || job.location;
    job.jobType = jobType || job.jobType;

    await job.save();

    return res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
