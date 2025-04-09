import { Request, Response, NextFunction, Router } from 'express';
import promotionController from "../controllers/promotion.controller";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await promotionController.getAllPromotions(req, res).catch(next);
});

router.post('/validation', async (req: Request, res: Response, next: NextFunction) => {
    await promotionController.validationPromotion(req, res).catch(next);
});

export default router;