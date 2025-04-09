import mongoose, { Schema } from "mongoose";
import { IReview } from "../interfaces/iReview";
import Movie from "./movie";

const ReviewSchema = new Schema<IReview>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movie_id: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

ReviewSchema.post("save", async function () {
    await updateMovieRating(this.movie_id.toString());
});

async function updateMovieRating(movieId: string) {
    const reviews = await Review.find({ movie_id: movieId });
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    await Movie.updateOne({ _id: movieId }, { rating: averageRating });
}

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;