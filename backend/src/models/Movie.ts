import mongoose, {Schema, Document} from 'mongoose';

export interface IMovie extends Document {
  title: string;
  genre: string;
  watched: boolean;
}

const MovieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    watched: { type: Boolean, default: false }
  },
  { timestamps: true }
)

MovieSchema.index({ title: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } }) //this is to ensure that the title is unique in the database, it creates an index on the title field and enforces uniqueness - the strength checks for case insensitivity e.g Inception vs inception

/** the title: 1 means ascending order and title: -1 means descending order */

const Movie = mongoose.model<IMovie>("Movie", MovieSchema); //I guess model takes in 2 enteries name and schema

/**model("Movie" - name, Schema) */

export default Movie;