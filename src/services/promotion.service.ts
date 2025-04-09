import { IPromotion } from "../interfaces/iPromotion";
import Promotion from "../models/promotion";

class PromotionService {
  // Creates a new promotion
  createPromotion = async (data: IPromotion): Promise<IPromotion> => {
    const exists = await Promotion.findOne({ code: data.code });

    if (exists) {
      throw new Error("Promotion code already exists");
    }

    const promotion = new Promotion(data);
    return await promotion.save();
  };

  // Updates an existing promotion by ID
  updatePromotion = async (
    id: string,
    data: Partial<IPromotion>
  ): Promise<IPromotion> => {
    const promotion = await Promotion.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!promotion) {
      throw new Error("Promotion not found");
    }

    return promotion;
  };

  // Deletes a promotion by ID
  deletePromotion = async (id: string): Promise<void> => {
    const promotion = await Promotion.findByIdAndDelete(id);

    if (!promotion) {
      throw new Error("Promotion not found");
    }
  };

  // Retrieves all promotions
  getAllPromotions = async (): Promise<IPromotion[]> => {
    return await Promotion.find();
  };

  // Retrieves a promotion by ID and checks if it's active
  getPromotionById = async (id: string): Promise<IPromotion | null> => {
    return await Promotion.findById(id);
  };

  validationPromotion = async (code: string): Promise<IPromotion | null> => {
    const promotion = await Promotion.findOne({ code });

    if (!promotion) {
      throw new Error("Invalid promotion code");
    }

    const now = new Date();

    if (now < promotion.start_date || now > promotion.end_date) {
      throw new Error("Promotion is not active");
    }

    return promotion;
  };
}

export default new PromotionService();
