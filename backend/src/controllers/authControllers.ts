import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { registerSchema, loginSchema } from '../../validation/authValidation';
import bcrypt from "bcryptjs";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  res.cookie("jwt", token, {
    httpOnly: true, //Js in the browser can't read the cookie
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7, //7 days in ms
  })
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("Username, email, and password are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    //creates a new user
    const user = await User.create({
      username, email, password
    })

    generateToken(user.id, res);

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email
    })

  } catch (e: unknown) {
    console.error(e);
    res.status(500).json({
      error: "Error registering user"
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    generateToken(user.id.toString(), res);

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email
    })

  } catch (e: unknown) {
    console.error(e);
    res.status(500).json({
      error: "Error logging in user"
    })
  }
}

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), //expire immediately
  });
  res.status(200).json({
    message: "Logged out successfully"
  });
}

//getting the user

export const getUser = async (req: Request, res: Response) => {
  res.json({
    _id: req.user!._id,
    username: req.user!.username,
    email: req.user!.email
  })
}

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!req.user) {
      res.status(401).json({
        error: "Unauthorized, no token provided"
      })
      return;
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({
        error: "User not found - password not updated"
      })
      return;
    }

    const currentPasswordCorrect = await user.comparePassword(currentPassword);

    if (!currentPasswordCorrect) {
      res.status(401).json({
        error: "Current password is incorrect"
      });
      return;
    }

      if (newPassword === currentPassword) {
      res.status(401).json({
        error: "New password must be different from your current password"
      }); 
      //end the function if the password is the same
      return;
    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully"
    })

  } catch (e: unknown) {
    console.error(e);
    res.status(500).json({
      error: "Error updating password"
    })
  }
};