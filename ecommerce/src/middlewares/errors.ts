import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500; // ✅ Ensure a valid HTTP status code

  res.status(statusCode).json({
    message: error.message || "Something went wrong",
    errorCode: error.errorCode || statusCode, // ✅ Set default errorCode
    errors: error.errors || {},
  });
};
