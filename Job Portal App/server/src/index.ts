import express from "express";

import userRoutes from "./Routes/user.routes";
import candidateRoutes from "./Routes/candidate.routes";
import jobRoutes from "./Routes/job.routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
const port = 5000;

const isProduction = process.env.NODE_ENV === "production";

const mongoURI = isProduction
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/job", jobRoutes);
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});

mongoose
  .connect(mongoURI as string)
  .then(() =>
    console.log(`MongoDB connected to ${isProduction ? "PROD" : "DEV"} DB`)
  )
  .catch((error) => console.error("MongoDB connection error:", error));
