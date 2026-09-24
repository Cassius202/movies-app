import { NextFunction, Request, Response } from "express";
import Movie from "../models/Movie";
import { request } from "node:http";

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({
        error: "Movie doesn't exist in database"
      });
    }
    res.json({ message: `'${movie.title}' deleted successfully` });
  } catch (error: unknown) {
    next(error);
  }
}

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, { watched: true }, { new: true }) //new true tells mongoose to return the movie after update (not the version before update)

    if (!movie) {
      return res.status(404).json({
        error: "Movie doesn't exist in database"
      })
    };

    res.json(movie);
  } catch (error: unknown) {
    next(error);
  }
}

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ error: "Movie not found" });
      return;
    }
    res.json(movie);
  } catch (error: unknown) {
    next(error);
  }
}

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {title, genre} = req.body; //the validation is taking place in the middleware
    console.log(req.body);

    const cleanedTitle = title.toLowerCase().replace(/^the\s+/i, "").trim();

    //removes all non-alphanumeric characters, converts to lowercase, and removes the word "the" from the beginning of the title

    const expandedTitle = "the " + cleanedTitle.trim();

    const duplicateMovie = await Movie.findOne({
      $or: [
        { title: cleanedTitle },
        { title: expandedTitle }
      ]
    }).collation({ locale: "en", strength: 2 })
    //this is to check for duplicates in the database, it checks for both the cleaned title and the formatted title (with "the" at the beginning) to ensure that we catch duplicates regardless of whether the user includes "the" in the title or not

    if (duplicateMovie) {
      res.status(409).json({ error: "Movie with this title already exists" });
      return;
    }

    const movie = await Movie.create({ title, genre })
    res.status(201).json(movie) //I am guessing this is why mongoose is very good - the watched defaults to boolean, and you can create database rows without stress
  } catch (error: unknown) {
    next(error);
  }
}

export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { genre, watched } = req.query; //query is a way to get the data from the url e.g /movies?genre=comedy&watched=true

    const page = Number.parseInt(req.query.page as string) || 1; //parseInt is a function that converts a string to a number, if the string is not a number it returns NaN
    const limit = Number.parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;


    const filter: Record<string, unknown> = {};

    if (genre) filter.genre = {
      $regex: genre, $options: "i"
    }; //this allows partial case insensitive matching (handled by mongoose) the regex allows you to search for substrings within the genre
    if (watched !== undefined) filter.watched = watched === 'true'; // cause query parameters are always strings- this is necessary

    const [movies, total] = await Promise.all([
      Movie.find(filter).collation({locale: "en", strength: 2}).skip(skip).limit(limit)
      ,
      Movie.countDocuments(filter),
    ]);

    if (!total) {
      return res.status(404).json({
        error: "No movies found"
      })
    }

    res.json({
      data: movies,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit),
        hasNextPage: page < Math.ceil(total/limit),
        hasPrviousPage: page > 1,
      }
    });
    //  console.log(movies);
  } catch (error: unknown) {
    next(error);
  }
}

export const updateMovieDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({
        error: "id is required"
      })
    }
    const title = req.body.title as string;
    const genre = req.body.genre as string;

    const eitherNameOrGenre = title.trim() || genre.trim();

    if (!eitherNameOrGenre) {
      return res.status(400).json({
        error: "Either title or genre is required"
      })
    }

    const movie = await Movie.findByIdAndUpdate(id, { title, genre }, { new: true }) //new true tells mongoose to return the movie after update (not the version before update)

    if (!movie) {
      return res.status(404).json({
        error: "Movie doesn't exist in database"
      })
    };

    res.json(movie);
  } catch (error: unknown) {
    next(error);
  }
}

export const getWatchedMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const watchedMovies = await Movie.find({ watched: true }).sort({ title: 1 });

    res.json(watchedMovies);
  } catch (error: unknown) {
    next(error);
  }
}