import { Request, Response } from "express";
import theaterService from "../services/theater.service";
import { ITheater } from "../interfaces/iTheater";

class TheaterController {
    getAllTheaters = async (req: Request, res: Response) => {
        try{
            const theaters = await theaterService.getAllTheaters();
            return res.status(200).json({
                success: true,
                message: "Get all theaters successfully",
                data: theaters,
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Get all theaters failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    getTheaterById = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            const theater = await theaterService.getTheaterById(id);
            return res.status(200).json({
                success: true,
                message: "Get theater by id successfully",
                data: theater,
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Get theater by id failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    addTheater = async (req: Request, res: Response) => {
        try{
            const theater = req.body as ITheater;
            const newTheater = await theaterService.addTheater(theater);
            return res.status(201).json({
                success: true,
                message: "Add theater successfully",
                data: newTheater,
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Add theater failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    updateTheater = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            const theater = req.body as ITheater;
            const updatedTheater = await theaterService.updateTheater(id, theater);
            return res.status(200).json({
                success: true,
                message: "Update theater successfully",
                data: updatedTheater,
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Update theater failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    deleteTheater = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            await theaterService.deleteTheater(id);
            return res.status(204).json({
                success: true,
                message: "Delete theater successfully",
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Delete theater failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    disableTheater = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            await theaterService.disableTheater(id);
            return res.status(204).json({
                success: true,
                message: "Disable theater successfully",
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                message: "Disable theater failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }
}

export default new TheaterController();