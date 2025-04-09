import { NextFunction, Request, Response, Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadAvatar } from "../middlewares/multer";

const router = Router();

router.post('/sign-up', uploadAvatar.single('avatar'), async (req: Request, res: Response, next: NextFunction) => {
  await authController.signUp(req, res).catch(next);
});

router.post('/sign-in', authMiddleware.checkLogin, async (req: Request, res: Response, next: NextFunction) => {
  await authController.signIn(req, res).catch(next);
});

router.delete('/sign-out', authMiddleware.isSignIn, async (req: Request, res: Response, next: NextFunction) => {
  await authController.signOut(req, res).catch(next);
});

router.post('/verify-sign-up', async (req: Request, res: Response, next: NextFunction) => {
  await authController.verifySignUp(req, res).catch(next);
});

router.post('/forgot-password', async (req: Request, res: Response, next: NextFunction) => {
  await authController.forgotPassword(req, res).catch(next);
});

router.post('/verify-password', async (req: Request, res: Response, next: NextFunction) => {
  await authController.verifyPassword(req, res).catch(next);
});

router.put('/reset-password', async (req: Request, res: Response, next: NextFunction) => {
  await authController.resetPassword(req, res).catch(next);
});

export default router;