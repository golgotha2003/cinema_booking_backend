import { Document, Types } from "mongoose";

export interface IShowtime extends Document {
    movie_id: Types.ObjectId;
    theater_id: Types.ObjectId;
    start_time: Date;
    end_time: Date;
}