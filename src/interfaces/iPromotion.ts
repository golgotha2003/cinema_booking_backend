import { Document } from "mongoose";
import { PromotionType } from "../utils/promotion/type.enum";

export interface IPromotion extends Document {
    code: string;
    discount: number;
    start_date: Date;
    end_date: Date;
    type: PromotionType;
    condition: string;
}