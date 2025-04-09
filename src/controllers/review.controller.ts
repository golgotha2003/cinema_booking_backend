import { Request, Response } from "express";
import reviewService from "../services/review.service";

class ReviewController {
  createReview = async (req: Request, res: Response) => {
    try{
        const { user_id, movie_id, rating, comment } = req.body;
        const review = await reviewService.createReview(user_id, movie_id, rating, comment);
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review creation failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  editReview = async (req: Request, res: Response) => {
    try{
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const review = await reviewService.editReview(reviewId, rating, comment);
        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review update failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  deleteReview = async (req: Request, res: Response) => {
    try{
        const { reviewId } = req.params;
        const review = await reviewService.deleteReview(reviewId);
        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: review,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review deletion failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  getReviewsByMovieId = async (req: Request, res: Response) => {
    try{
        const { movieId } = req.params;
        const reviews = await reviewService.getReviewsByMovieId(movieId);
        res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            data: reviews,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review retrieval failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  getMyReviews = async (req: Request, res: Response) => {
    try{
        const { userId } = req.params;
        const reviews = await reviewService.getMyReviews(userId);
        res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            data: reviews,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review retrieval failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  deleteReviewsByAdmin = async (req: Request, res: Response) => {
    try{
        const { reviewIds } = req.body;
        const reviews = await reviewService.deleteReviewsByAdmin(reviewIds);
        res.status(200).json({
            success: true,
            message: "Reviews deleted successfully",
            data: reviews,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review deletion failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  filterReviews = async (req: Request, res: Response) => {
    try{
        const { filter } = req.body;
        const reviews = await reviewService.filterReviews(filter);
        res.status(200).json({
            success: true,
            message: "Reviews filtered successfully",
            data: reviews,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review filtering failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  likeReview = async (req: Request, res: Response) => {
    try{
        const { reviewId } = req.params;
        const review = await reviewService.likeReview(reviewId);
        res.status(200).json({
            success: true,
            message: "Review liked successfully",
            data: review,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review liking failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  unlikeReview = async (req: Request, res: Response) => {
    try{
        const { reviewId } = req.params;
        const review = await reviewService.unlikeReview(reviewId);
        res.status(200).json({
            success: true,
            message: "Review unliked successfully",
            data: review,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Review unliking failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };

  getTopRatedMovies = async (req: Request, res: Response) => {
    try{
        const reviews = await reviewService.getTopRatedMovies();
        res.status(200).json({
            success: true,
            message: "Top rated movies retrieved successfully",
            data: reviews,
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: "Top rated movies retrieval failed",
            error: err instanceof Error ? err.message : err,
        });
    }
  };
}
