import { Request, Response } from "express";
import userService from "../services/user.service";
import { CurrentResponseDto } from "../dto/res/user.res.dto";
import { verifyToken } from "../utils/token/generateToken";

class UserController {
  getCurrent = async (req: Request, res: Response) => {
    try {
      const decoded = verifyToken(req.session.access_token as string);

      const user = await userService.getCurrent(decoded.email);

      return res.status(200).json({
        success: true,
        message: "Get current user successfully",
        data: user,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Get current user failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  updateCurrent = async (req: Request, res: Response) => {
    try {

      const decoded = verifyToken(req.session.access_token as string);

      const user: CurrentResponseDto = {
        email: decoded.email,
        avatar: req.file?.path || undefined,
        full_name: req.body.full_name,
        phone: req.body.phone
      };

      const updateUser = await userService.updateCurrent(user);

      return res.status(200).json({
        success: true,
        message: "Update current user successfully",
        data: updateUser,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Update current user failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const decoded = verifyToken(req.session.access_token as string);
      const oldPassword = req.body.oldPassword as string;
      const newPassword = req.body.newPassword as string;

      await userService.changePassword(decoded.email, oldPassword, newPassword);

      await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      return res.status(200).json({
        success: true,
        message: "Reset password successfully, please sign in again",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Reset password failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };
}

export default new UserController();
