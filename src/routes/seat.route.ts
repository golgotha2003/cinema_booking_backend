import { Request, Response, NextFunction, Router } from "express";
import seatController from "../controllers/seat.controller";

const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await seatController.getSeatsByTheaterId(req, res).catch(next);
});

export default router;