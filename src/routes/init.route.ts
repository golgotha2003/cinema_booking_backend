import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import authMiddleware from "../middlewares/auth.middleware";
import adminRoute from "./admin.route";
import movieRoute from "./movie.route";
import theaterRoute from "./theater.route";
import seatRoute from "./seat.route";
import showtimeRoute from "./showtime.route";
import ticketRoute from "./ticket.route";
import promotionRoute from "./promotion.route";
import paymentRoute from "./payment.route";

const router = Router();

router.use('/auth', authRoute);
router.use('/user', authMiddleware.isSignIn, userRoute);
router.use('/admin', authMiddleware.isAdmin, adminRoute);
router.use('/movie', movieRoute);
router.use('/theater', theaterRoute);
router.use('/seat', seatRoute);
router.use('/showtime', showtimeRoute);
router.use('/ticket', ticketRoute);
router.use('/promotion', authMiddleware.isSignIn, promotionRoute);
router.use('/payment', authMiddleware.isSignIn, paymentRoute);

export default router;