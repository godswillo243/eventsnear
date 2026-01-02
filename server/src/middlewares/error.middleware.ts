// middleware/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http-error";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  const statusCode = err instanceof HttpError ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};
