import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db';
import router from './routes/Movies';
import {logger} from './middleware/logger'
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';
import authRouter from './routes/auth';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet'; //helmet is a middleware that adds security headers to the response - literally a helmet for the server

dotenv.config(); //allows you to use process.env to access environment variables defined in a .env file
const app = express();
const PORT = Number(process.env.PORT) || 3001; //app is an instance of express

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: {
    error: 'Too many requests please try again after 15 minutes',
  }
});

app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
})); //allows cross-origin requests from the frontend
app.use(express.json()); //important middleware allow us to parse request body
app.use(express.urlencoded({ extended: true })); //allows us to parse url encoded data
app.use(limiter); //rate limiting middleware
app.use(cookieParser()); //allows us to parse cookies
app.use(logger); //custom middleware that logs the request and response to the console
app.use("/auth", authRouter);
app.use("/movies", router);
app.use(errorHandler); //always last

const start = async (): Promise<void> => {
  try {
     await connectDB();
     app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
     });
  } catch (error: unknown) {
    console.error('Failed to start the server');
    if (error instanceof Error) {
      console.error(error.message);
    }
    // rethrow so the outer promise rejection handler can run    
    throw error;
  }
}

start()
