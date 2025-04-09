import { Request, Response, NextFunction, Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadAvatar } from "../middlewares/multer";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getCurrent(req, res).catch(next);
});

router.put('/:id', uploadAvatar.single('avatar'), authMiddleware.updateAvatar, async (req: Request, res: Response, next: NextFunction) => {
    await userController.updateCurrent(req, res).catch(next);
});

router.put('/change-password', async (req: Request, res: Response, next: NextFunction) => {
    await userController.changePassword(req, res).catch(next);
});

export default router;