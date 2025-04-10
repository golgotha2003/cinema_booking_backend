import { NextFunction, Request, Response } from "express";
import movieService from "../services/movie.service";
import cloudinary from "../config/cloudinary";

class MovieMiddleware {
    //check existing poster and trailer
    updateMovie = async (req: Request, res : Response, next : NextFunction): Promise<void> => {
        try {

            const id = req.params.id;
            const movie = await movieService.getMovieById(id);
            
            if (!movie) {
                res.status(404).json({
                    success: false,
                    message: "Movie not found",
                });
                return;
            }
    
            // Kiểm tra xem req.files có tồn tại không
            if (!req.files) {
                return next(); // Nếu không có tệp, tiếp tục với next()
            }

            // Kiểm tra poster có thay đổi không
            if (
                req.files &&
                !Array.isArray(req.files) &&
                req.files.poster &&
                Array.isArray(req.files.poster) &&
                req.files.poster.length > 0
              ) {
                const newPosterPath = req.files.poster[0].path;
                if (movie.poster !== newPosterPath) {
                  const public_id = movie.poster.split("/").pop()?.split(".")[0];
                  if (public_id) {
                    await cloudinary.uploader.destroy(public_id);
                  }
                }
              }
              
    
            // Kiểm tra trailer có thay đổi không
            if (
                req.files &&
                !Array.isArray(req.files) &&
                req.files.trailer &&
                Array.isArray(req.files.trailer) &&
                req.files.trailer.length > 0
              ) {
                const newTrailerPath = req.files.trailer[0].path;
                if (movie.trailer !== newTrailerPath) {
                  const public_id = movie.trailer.split("/").pop()?.split(".")[0];
                  if (public_id) {
                    await cloudinary.uploader.destroy(public_id); // Xóa trailer cũ
                  }
                }
              }
              
    
            return next(); // Tiến hành tiếp với bước tiếp theo
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error,
            });
            return;
        }
    };    
}

export default new MovieMiddleware();