import Payment from "../models/payment";
import Promotion from "../models/promotion";
import Ticket from "../models/ticket";
import MomoPayment from "../utils/momo/momo";
import { PaymentMethod } from "../utils/payment/method.enum";
import { PaymentStatus } from "../utils/payment/status.enum";
import { TicketStatus } from "../utils/ticket/status.enum";
import dotenv from "dotenv";

dotenv.config();

const momo = new MomoPayment({
    partnerCode: process.env.MOMO_PARTNER_CODE!,
    accessKey: process.env.MOMO_ACCESS_KEY!,
    secretKey: process.env.MOMO_SECRET_KEY!,
    environment: process.env.MOMO_ENVIRONMENT! as 'sandbox' | 'live'
})

class PaymentService {

    /**
     * Process payment
     * @param ticketId - ticket id
     * @param price - ticket price
     * @param method - payment method
     * @param promotionCode - promotion code
     * @returns 
     */
    processPayment = async (ticketId: string, price: number, method: PaymentMethod, promotionCode?: string) => {
        if (!Object.values(PaymentMethod).includes(method)) {
            throw new Error("Invalid payment method");
        }
    
        const transactionId = `TXN_${Date.now()}`;
        let status: PaymentStatus = PaymentStatus.PENDING;
        let amount = price;
    
        if (promotionCode) {
            const promotion = await Promotion.findOne({ code: promotionCode });
            if (!promotion) {
                throw new Error("Invalid promotion code");
            }
            amount = promotion.discount < price ? price - promotion.discount : 0;
        }
    
        let paymentUrl: string | undefined;
    
        if (amount === 0) {
            status = PaymentStatus.SUCCESS;
        } else {
            switch (method) {
                case PaymentMethod.CASH:
                    status = PaymentStatus.PENDING;
                    break;
    
                case PaymentMethod.CREDIT_CARD:
                    const creditCardSuccess = true;
                    status = creditCardSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
                    break;
    
                case PaymentMethod.E_WALLET:
                    amount = parseInt(amount.toString())
                    const result = await momo.createPayment({
                        requestId: transactionId,
                        orderId: transactionId,
                        amount: amount.toString(),
                        orderInfo: `Payment for ticket ${ticketId}`,
                        returnUrl: process.env.MOMO_RETURN_URL!,
                        notifyUrl: process.env.MOMO_NOTIFY_URL!,
                    });
    
                    if (result && result.payUrl) {
                        paymentUrl = result.payUrl;
                        status = PaymentStatus.PENDING;
                    } else {
                        status = PaymentStatus.FAILED;
                    }
                    break;
    
                default:
                    throw new Error("Unsupported payment method");
            }
        }
    
        const payment = new Payment({
            ticket_id: ticketId,
            amount,
            method,
            status,
            transaction_id: transactionId,
            payment_url: paymentUrl,
        });
    
        await payment.save();
    
        return { payment, paymentUrl };
    }
    
    /**
     * Get payment by ticket id
     * @param ticketId - ticket id
     * @returns 
     */
    getPaymentByTicketId = async (ticketId: string) => {
        const payment = await Payment.findOne({ ticket_id: ticketId });
        return payment;
    }
    
    /**
     * Refund payment
     * @param ticketId - ticket id
     * @returns 
     */
    refundPayment = async (ticketId: string) => {
        const payment = await Payment.findOne({ ticket_id: ticketId });
        if (!payment) {
            throw new Error("Payment not found");
        }

        if(payment.status !== PaymentStatus.SUCCESS) {
            throw new Error("Only successful payments can be refunded");
        }


        payment.status = PaymentStatus.REFUNDED;
        await payment.save();

        await Ticket.findOneAndUpdate({ _id: ticketId }, { status: TicketStatus.CANCELLED });

        return payment;
    }
}

export default new PaymentService();