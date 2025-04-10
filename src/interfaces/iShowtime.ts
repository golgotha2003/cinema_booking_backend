import { Document, Types } from "mongoose";
import { ShowtimeStatus } from "../utils/showtime/status.enum";

export interface IShowtime extends Document {
  movie_id: Types.ObjectId;
  theater_id: Types.ObjectId;
  start_time: Date;
  end_time: Date;
  status: ShowtimeStatus;
}
