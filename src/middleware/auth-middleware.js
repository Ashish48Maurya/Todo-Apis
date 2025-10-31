import jwt from "jsonwebtoken";
import { ApiError } from "../utilities/ApiError.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json(ApiError.Unauthorized("No authentication token provided."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(401)
      .json(ApiError.Unauthorized("Invalid or expired token."));
  }
};