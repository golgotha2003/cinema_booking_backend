import mongoose, { Schema } from "mongoose";
import { IShowtime } from "../interfaces/iShowtime";
import { ShowtimeStatus } from "../utils/showtime/status.enum";

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
    status: {
      type: String,
      enum: Object.values(ShowtimeStatus),
      default: ShowtimeStatus.COMING_SOON
    }
  },
  {
    timestamps: true,
  }
);

const Showtime = mongoose.model<IShowtime>("Showtime", ShowtimeSchema);

export default Showtime;