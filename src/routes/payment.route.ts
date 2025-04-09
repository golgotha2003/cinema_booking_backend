import { Request, Response, NextFunction, Router } from "express";
import paymentController from "../controllers/payment.controller";

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await paymentController.processPayment(req, res).catch(next);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await paymentController.getPaymentByTicketId(req, res).catch(next);
});

router.put('/refund', async (req: Request, res: Response, next: NextFunction) => {
    await paymentController.refundPayment(req, res).catch(next);
});

export default router;