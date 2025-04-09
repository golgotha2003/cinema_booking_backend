import mongoose, { Schema } from "mongoose";
import { IShowtime } from "../interfaces/iShowtime";

const ShowtimeSchema = new Schema<IShowtime>(
  {
    movie_id: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    theater_id: {
      type: Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Showtime = mongoose.model<IShowtime>("Showtime", ShowtimeSchema);

export default Showtime;