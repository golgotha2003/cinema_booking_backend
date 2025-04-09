import ticketController from "../controllers/ticket.controller";
import { Request, Response, NextFunction, Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post('/book-ticket', authMiddleware.isSignIn, async (req: Request, res: Response, next: NextFunction) => {
    await ticketController.bookTicket(req, res).catch(next);
});

router.delete('/cancel-ticket/:id', authMiddleware.isSignIn, async (req: Request, res: Response, next: NextFunction) => {
    await ticketController.cancelTicket(req, res).catch(next);
});

router.get('/', authMiddleware.isSignIn, async (req: Request, res: Response, next: NextFunction) => {
    await ticketController.getTicketsByUserId(req, res).catch(next);
});

router.get('/get-available-seats', async (req: Request, res: Response, next: NextFunction) => {
    await ticketController.getAvailableSeats(req, res).catch(next);
});

export default router;