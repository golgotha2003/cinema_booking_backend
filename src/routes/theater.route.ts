import { Request, Response, NextFunction, Router } from "express";
import theaterController from "../controllers/theater.controller";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.getAllTheaters(req, res).catch(next);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.getTheaterById(req, res).catch(next);
});

export default router;