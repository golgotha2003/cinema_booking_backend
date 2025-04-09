import { Document, Types } from "mongoose";

export interface IReview extends Document {
    user_id: Types.ObjectId;
    movie_id: Types.ObjectId;
    rating: number;
    comment: string;
    likes: number
}