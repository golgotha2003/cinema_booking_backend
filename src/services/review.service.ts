import Review from "../models/review";

class ReviewService {
    createReview = async (userId: string, movieId: string, rating: number, comment: string) => {
        const review = new Review({ user_id: userId, movie_id: movieId, rating, comment });
        await review.save();
    }

    editReview = async (reviewId: string, rating: number, comment: string) => {
        return await Review.updateOne({ _id: reviewId }, { rating, comment });
    }

    deleteReview = async (reviewId: string) => {
        return await Review.deleteOne({ _id: reviewId });
    }

    getReviewsByMovieId = async (movieId: string) => {
        return await Review.find({ movie_id: movieId }).sort({ createdAt: -1 });
    }

    getMyReviews = async (userId: string) => {
        return await Review.find({ user_id: userId }).sort({ createdAt: -1 });
    }

    deleteReviewsByAdmin = async (reviewIds: string[]) => {
        return await Review.deleteMany({ _id: { $in: reviewIds } });
    }

    filterReviews = async(filter: any) => {
        return await Review.find(filter).sort({ createdAt: -1 });
    }

    likeReview = async (reviewId: string) => {
        return await Review.updateOne({ _id: reviewId }, { $inc: { likes: 1 } });
    }

    unlikeReview = async (reviewId: string) => {
        return await Review.updateOne({ _id: reviewId }, { $inc: { likes: -1 } });
    }

    getTopRatedMovies = async() => {
        return await Review.aggregate([{$group: {_id: "$movie_id", averageRating: {$avg: "$rating"}}}, {$sort: {averageRating: -1}}]);
    }
}

export default new ReviewService();