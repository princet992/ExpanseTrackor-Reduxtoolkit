import jwt from "jsonwebtoken";
import { AuthenticationModel } from "../model/AuthenticationModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await AuthenticationModel.findById(decoded.id).select("-password");
    if (!req.user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};