import { Router, Request, Response, NextFunction } from 'express'
import { deleteMovie, getAllMovies, getMovieById, createMovie, updateMovie, updateMovieDetails, getWatchedMovies } from '../controllers/MovieController';
import { createMovieSchema } from '../../validation/movieValidation';
import { validate } from '../middleware/validate';
import { protect } from '../middleware/protect';

const router = Router();

// 1. SPECIFIC static routes (no parameters)
router.get("/watched", getWatchedMovies);

// 2. Routes with static segments AFTER parameters are fine
router.patch("/:id/watched", protect, updateMovie)

// 3. Basic CRUD parameter routes
router.get("/:id", getMovieById)
router.patch("/:id", protect, updateMovieDetails)
router.delete("/:id", protect, deleteMovie);

// 4. General routes (catch-alls)
router.get("/", getAllMovies);
router.post("/", protect, validate(createMovieSchema), createMovie)

export default router;