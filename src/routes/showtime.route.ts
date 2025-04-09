import { Request, Response, NextFunction, Router } from "express";
import showtimeController from "../controllers/showtime.controller";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getAllShowtimes(req, res).catch(next);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getShowtimeById(req, res).catch(next);
});

router.get('/get-by-movie-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getShowtimesByMovieId(req, res).catch(next);
});

router.get('/get-by-theater-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getShowtimesByTheaterId(req, res).catch(next);
});

router.get('/get-available-seats', async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.getAvailableSeats(req, res).catch(next);
});

export default router;