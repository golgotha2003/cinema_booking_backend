import { NextFunction, Request, Response } from "express";
import { Role } from "../utils/user/role.enum";
import User from "../models/user";
import { verifyToken } from "../utils/token/generateToken";
import cloudinary from "../config/cloudinary";

class AuthMiddleware {
  isSignIn = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session?.access_token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
    next();
  };

  isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.session.access_token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const decoded = verifyToken(req.session.access_token);

      if (decoded.role !== Role.ADMIN) {
        res.status(403).json({
          success: false,
          message: "Forbidden",
        });
        return;
      }

      next(); // ✅ Chỉ gọi nếu tất cả điều kiện đều hợp lệ
    } catch (error) {
      next(error); // ✅ Đảm bảo bắt lỗi và chuyển đến error handler
    }
  };

  checkLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (req.session.access_token) {
        res.status(400).json({
          success: false,
          message: "You are logged in",
        });
        return; // ✅ Dừng hàm nhưng không trả về Response
      }

      next(); // ✅ Chỉ gọi next() khi hợp lệ
    } catch (error) {
      next(error); // ✅ Đẩy lỗi vào middleware xử lý lỗi
    }
  };

  updateAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.params.id;
      const file = req.file;

      if (!file) next();

      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }

      // Nếu avatar hiện tại không phải là ảnh mặc định thì mới xóa
      const defaultAvatar =
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
      if (user.avatar && user.avatar !== defaultAvatar) {
        // Lấy public_id từ URL (Cloudinary cần public_id để xóa)
        const publicIdMatch = user.avatar.match(
          /\/avatars\/(.+)\.(jpg|jpeg|png|webp)/
        );
        if (publicIdMatch) {
          const publicId = `avatars/${publicIdMatch[1]}`;
          await cloudinary.uploader.destroy(publicId);
        }
      }

      next();
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Update current user failed",
        error: err instanceof Error ? err.message : err,
      });

      return;
    }
  };
}

export default new AuthMiddleware();
