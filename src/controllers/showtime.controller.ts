import { Request, Response } from "express";
import showtimeService from "../services/showtime.service";
import { IShowtime } from "../interfaces/iShowtime";

class ShowtimeController {
    createShowtime = async (req: Request, res: Response) => {
        try{
            const showtime = showtimeService.createShowtime(req.body as IShowtime);

            return res.status(201).json({
                success: true,
                message: "Showtime created successfully",
                data: showtime
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Create showtime failed",
                error: err instanceof Error ? err.message : err
            });
        }
    }

    updateShowtime = async (req: Request, res: Response) => {
        try{
            const showtimeId = req.params.id;

            const showtime = showtimeService.updateShowtime( showtimeId, req.body as IShowtime);

            return res.status(200).json({
                success: true,
                message: "Showtime updated successfully",
                data: showtime
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Update showtime failed",
                error: err instanceof Error ? err.message : err
            });
        }
    }

    deleteShowtime = async (req: Request, res: Response) => {
        try{
            const showtimeId = req.params.id;

            await showtimeService.deleteShowtime(showtimeId);

            return res.status(200).json({
                success: true,
                message: "Showtime deleted successfully"
            }); 
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Delete showtime failed",
                error: err instanceof Error ? err.message : err
            });
        }
    }

    getAllShowtimes = async (req: Request, res: Response) => {
        try{
            const showtimes = await showtimeService.getAllShowtimes();

            return res.status(200).json({
                success: true,
                message: "Get all showtimes successfully",
                data: showtimes
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Get all showtimes failed",
                error: err instanceof Error ? err.message : err
            });
        }
    }

    getShowtimeById = async (req: Request, res: Response) => {
        try{
            const showtimeId = req.params.id;   

            const showtime = await showtimeService.getShowtimeById(showtimeId);

            return res.status(200).json({
                success: true,
                message: "Get showtime by id successfully",
                data: showtime
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Get showtime by id failed",
                error: err instanceof Error ? err.message : err
            });
        }    
    }

    getShowtimesByMovieId = async (req: Request, res: Response) => {
        try{
            const movieId = req.params.id;

            const showtimes = await showtimeService.getShowtimesByMovie(movieId);

            return res.status(200).json({
                success: true,
                message: "Get showtimes by movie successfully",
                data: showtimes
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Get showtimes by movie failed",
                error: err instanceof Error ? err.message : err
            });
        }
    }

    getShowtimesByTheaterId = async (req: Request, res: Response) => {
        try{
            const theaterId = req.params.id;

            const showtimes = await showtimeService.getShowtimesByTheater(theaterId);

            return res.status(200).json({
                success: true,
                message: "Get showtimes by theater successfully",
                data: showtimes
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Get showtimes by theater failed",
                error: err instanceof Error ? err.message : err
            });
        }
    }

    getShowtimesByDate = async (req: Request, res: Response) => {
        try{
            const date = new Date(req.params.date);

            const showtimes = await showtimeService.getShowtimesByDate(date);

            return res.status(200).json({
                success: true,
                message: "Get showtimes by date successfully",
                data: showtimes
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Get showtimes by date failed",
                error: err instanceof Error ? err.message : err
            });
        }
    }

    getAvailableSeats = async (req: Request, res: Response) => {
        try{
            const showtimeId = req.params.id;

            const availableSeats = await showtimeService.getAvailableSeats(showtimeId);

            return res.status(200).json({
                success: true,
                message: "Get available seats successfully",
                data: availableSeats
            });
        }
        catch(err){ 
            return res.status(400).json({
                success: false,
                message: "Get available seats failed",
                error: err instanceof Error ? err.message : err
            });
        }
    }
}

export default new ShowtimeController();