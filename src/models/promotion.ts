import mongoose, { Schema } from "mongoose";
import { IPromotion } from "../interfaces/iPromotion";
import { PromotionType } from "../utils/promotion/type.enum";
import { PromotionStatus } from "../utils/promotion/status.enum";

const PromotionSchema = new Schema<IPromotion>({
    code: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(PromotionType),
        default: PromotionType.ALL
    },
    condition: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(PromotionStatus),
        default: PromotionStatus.COMING_SOON
    }
}, {
    timestamps: true
});

const Promotion = mongoose.model<IPromotion>("Promotion", PromotionSchema);

export default Promotion; 