import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized, no token provided"
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await User.findById(decoded.userId).select('-password'); //excludes the password from the response

    if (!user) return res.status(401).json({
      error: "Unauthorized, invalid token"
    })

    req.user = user; //this is throwing an error - user is not defined on request
    next();
  } catch (error: unknown) {
    res.status(401).json({
      error: "Unauthorized, invalid token"
    })
  }
}