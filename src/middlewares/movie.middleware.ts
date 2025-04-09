import { NextFunction, Request, Response } from "express";
import { IRequestWithFiles } from "../interfaces/iRequestWithFile";
import movieService from "../services/movie.service";
import cloudinary from "../config/cloudinary";

class MovieMiddleware {
    //check existing poster and trailer
    updateMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const typedReq = req as IRequestWithFiles; 

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
            if (typedReq.files.poster && Array.isArray(typedReq.files.poster) && typedReq.files.poster.length > 0) {
                const newPosterPath = typedReq.files.poster[0].path;
                if (movie.poster !== newPosterPath) {
                    const public_id = movie.poster.split("/").pop()?.split(".")[0];
                    if (public_id) {
                        await cloudinary.uploader.destroy(public_id); // Xóa poster cũ
                    }
                }
            }
    
            // Kiểm tra trailer có thay đổi không
            if (typedReq.files.trailer && Array.isArray(typedReq.files.trailer) && typedReq.files.trailer.length > 0) {
                const newTrailerPath = typedReq.files.trailer[0].path;
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