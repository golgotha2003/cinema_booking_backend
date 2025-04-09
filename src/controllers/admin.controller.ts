import { Request, Response } from "express";
import adminService from "../services/admin.service";

class AdminController {
  getAllUsers = async (req: Request, res: Response) => {
    const users = await adminService.getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Get all users successfully",
      data: users,
    });
  };

  toggleUserStatus = async (req: Request, res: Response) => {
    try {
      const { email, isLocked } = req.body as {
        email: string;
        isLocked: boolean;
      };

      const status = await adminService.toggleUserStatus(email, isLocked);

      return res.status(200).json({
        success: true,
        message: "Toggle user status successfully",
        status: status,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Toggle user status failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };
}

export default new AdminController();