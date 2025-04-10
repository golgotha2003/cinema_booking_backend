import { Document } from "mongoose";
import { PromotionType } from "../utils/promotion/type.enum";
import { PromotionStatus } from "../utils/promotion/status.enum";

export interface IPromotion extends Document {
    code: string;
    discount: number;
    start_date: Date;
    end_date: Date;
    type: PromotionType;
    condition: string;
    status: PromotionStatus;
}