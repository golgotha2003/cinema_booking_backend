import { Request, Response } from "express";
import promotionService from "../services/promotion.service";
import { IPromotion } from "../interfaces/iPromotion";

class PromotionController {
  createPromotion = async (req: Request, res: Response) => {
    try {
      const data = req.body as IPromotion;
      const promotion = await promotionService.createPromotion(data);
      res.status(201).json({
        success: true,
        message: "Promotion created successfully",
        data: promotion,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Promotion creation failed",
        error: error.message,
      });
    }
  };

  updatePromotion = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = req.body as IPromotion;
      const promotion = await promotionService.updatePromotion(id, data);
      res.status(200).json({
        success: true,
        message: "Promotion updated successfully",
        data: promotion,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Promotion update failed",
        error: error.message,
      });
    }
  };

  deletePromotion = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await promotionService.deletePromotion(id);
      res.status(200).json({
        success: true,
        message: "Promotion deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Promotion deletion failed",
        error: error.message,
      });
    }
  };

  getAllPromotions = async (req: Request, res: Response) => {
    try {
      const promotions = await promotionService.getAllPromotions();
      res.status(200).json({
        success: true,
        message: "Get all promotions successfully",
        data: promotions,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Get all promotions failed",
        error: error.message,
      });
    }
  };

  getPromotionById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const promotion = await promotionService.getPromotionById(id);
      res.status(200).json({
        success: true,
        message: "Get promotion by id successfully",
        data: promotion,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Get promotion by id failed",
        error: error.message,
      });
    }
  };

  validationPromotion = async (req: Request, res: Response) => {
    try {
      const code = req.params.code;
      const promotion = await promotionService.validationPromotion(code);
      res.status(200).json({
        success: true,
        message: "Vaid promotion successfully",
        data: promotion,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Vaid promotion failed",
        error: error.message,
      });
    }
  };
}

export default new PromotionController();