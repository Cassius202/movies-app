import { Router, Request, Response, NextFunction } from 'express'
import { register, login, logout, getUser, updatePassword } from '../controllers/authControllers';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema, changePasswordSchema } from '../../validation/authValidation';
import { protect } from '../middleware/protect';
import rateLimit from 'express-rate-limit';

const authRouter = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: {
    error: 'Too many requests, please try again after 15 minutes',
  }
});

authRouter.post("/register", authLimiter, validate(registerSchema), register)

authRouter.post("/login", authLimiter, validate(loginSchema), login)

authRouter.post("/logout", logout);

authRouter.get("/me", protect, getUser);

authRouter.patch("/update-password", protect, validate(changePasswordSchema), updatePassword);

export default authRouter;