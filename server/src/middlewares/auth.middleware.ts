import { Handler } from "express";
import { asyncHandler } from "../utils/async-handler";
import { admin } from "../config/firebase";

export const firebaseAuthMiddleware = asyncHandler(async (req, res, next) => {
  const firebaseToken = req.headers.authorization?.split("Bearer ")[1];
  if (!firebaseToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
  if (!decodedToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  (req as any).decodedToken = decodedToken;
  next();
});
