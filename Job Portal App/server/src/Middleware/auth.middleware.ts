import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  console.log("token", token);
  if (!token) {
    res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    console.log("req.user in mw", req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Invalid token" });
  }
};

export const adminCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden. Admins only." });
  }
  next();
};
