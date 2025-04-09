import { Request, Response, NextFunction, Router, RequestHandler } from "express";
import adminController from "../controllers/admin.controller";
import movieController from "../controllers/movie.controller";
import theaterController from "../controllers/theater.controller";
import seatController from "../controllers/seat.controller";
import showtimeController from "../controllers/showtime.controller";
import ticketController from "../controllers/ticket.controller";
import promotionController from "../controllers/promotion.controller";
import { uploadMovie } from "../middlewares/multer";
import { IRequestWithFiles } from "../interfaces/iRequestWithFile";
import movieMiddleware from "../middlewares/movie.middleware";

const router = Router();

//Users
router.get(
  "/get-all-users",
  async (req: Request, res: Response, next: NextFunction) => {
    await adminController.getAllUsers(req, res).catch(next);
  }
);

router.put(
  "/toggle-user-status",
  async (req: Request, res: Response, next: NextFunction) => {
    await adminController.toggleUserStatus(req, res).catch(next);
  }
);

//Movies
router.post(
  "/add-movie", uploadMovie.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'trailer', maxCount: 1 }
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    await movieController.addMovie(req as IRequestWithFiles, res).catch(next);
  }
);

router.put(
  "/update-movie", uploadMovie.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'trailer', maxCount: 1 }
  ]), 
  movieMiddleware.updateMovie,
  async (req: Request, res: Response, next: NextFunction) => {
    await movieController.updateMovie(req as IRequestWithFiles, res).catch(next);
  }
);

router.delete(
  "/delete-movie",
  async (req: Request, res: Response, next: NextFunction) => {
    await movieController.deleteMovie(req, res).catch(next);
  }
);

//Theaters
router.post(
  "/add-theater",
  async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.addTheater(req, res).catch(next);
  }
);

router.put(
  "/update-theater",
  async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.updateTheater(req, res).catch(next);
  }
);

router.delete(
  "/delete-theater",
  async (req: Request, res: Response, next: NextFunction) => {
    await theaterController.deleteTheater(req, res).catch(next);
  }
);

//Seats
router.post(
  "/add-seat",
  async (req: Request, res: Response, next: NextFunction) => {
    await seatController.addSeat(req, res).catch(next);
  }
);

router.put(
  "/update-seat",
  async (req: Request, res: Response, next: NextFunction) => {
    await seatController.updateSeat(req, res).catch(next);
  }
);

router.delete(
  "/delete-seat",
  async (req: Request, res: Response, next: NextFunction) => {
    await seatController.deleteSeat(req, res).catch(next);
  }
);

//Showtimes
router.post(
  "/create-showtime",
  async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.createShowtime(req, res).catch(next);
  }
);

router.put(
  "/update-showtime",
  async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.updateShowtime(req, res).catch(next);
  }
);

router.delete(
  "/delete-showtime",
  async (req: Request, res: Response, next: NextFunction) => {
    await showtimeController.deleteShowtime(req, res).catch(next);
  }
);

//Tickets
router.get('/get-tickets-by-showtime-id', async (req: Request, res: Response, next: NextFunction) => {
    await ticketController.getTicketsByShowtimeId(req, res).catch(next);
});

//Promotions
router.post('/create-promotion', async (req: Request, res: Response, next: NextFunction) => {
    await promotionController.createPromotion(req, res).catch(next);
});

router.put('/update-promotion', async (req: Request, res: Response, next: NextFunction) => {
  await promotionController.updatePromotion(req, res).catch(next);
});

router.delete('/delete-promotion', async (req: Request, res: Response, next: NextFunction) => {
  await promotionController.deletePromotion(req, res).catch(next);
});

router.get('/get-promotion-by-id', async (req: Request, res: Response, next: NextFunction) => {
  await promotionController.getPromotionById(req, res).catch(next);
});

export default router;
