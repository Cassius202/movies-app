import mongoose from 'mongoose';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    console.log("attempting to connect to the database...");
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log('Connected to the database');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Error connecting to the database');
    }
    process.exit(1);
  }
}