import {z} from "zod";

const schemaObject = {
  title: z.string({
    error: "Title is required"
  }).min(1, "Title cannot be empty").max(100, "Title cannot be longer than 100 characters").trim(),

  genre: z.string({error: "Genre is required"}).min(1, "Genre cannot be empty").max(50, "Genre cannot be longer than 50 characters").trim(),
}
export const createMovieSchema = z.object(schemaObject)

export type CreateMovieInput = z.infer<typeof createMovieSchema>