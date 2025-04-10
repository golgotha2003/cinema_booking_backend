import { Document, Types } from "mongoose";
import { PaymentMethod } from "../utils/payment/method.enum";
import { PaymentStatus } from "../utils/payment/status.enum";

export interface IPayment extends Document {
    ticket_id: Types.ObjectId;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transaction_id: string;
    payment_url?: string;
}