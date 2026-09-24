import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: err.message || "Invalid ID format" });
    return;
  }

  res.status(500).json({ error: err.message || "Something went wrong" });
}

//NOTE: This is a custom error handler middleware for Express.js

//NOTE: Express identifies error handlers by their four parameters - arity (the number of arguments they take).