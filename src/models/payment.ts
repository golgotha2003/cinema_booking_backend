import mongoose, { Schema } from "mongoose";
import { IPayment } from "../interfaces/iPayment";
import { PaymentMethod } from "../utils/payment/method.enum";
import { PaymentStatus } from "../utils/payment/status.enum";

const PaymentSchema = new Schema<IPayment>({
    ticket_id: {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    method: {
        type: String,
        enum: Object.values(PaymentMethod),
        default: PaymentMethod.CASH,
    },
    status: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING,
    },
    transaction_id: {
        type: String,
        required: true,
    },
    payment_url: { type: String, required: false },
}, {
    timestamps: true,
});

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;