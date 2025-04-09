import Payment from "../models/payment";
import Promotion from "../models/promotion";
import Ticket from "../models/ticket";
import { PaymentMethod } from "../utils/payment/method.enum";
import { PaymentStatus } from "../utils/payment/status.enum";
import { TicketStatus } from "../utils/ticket/status.enum";

class PaymentService {
    processPayment = async (ticketId: string, price: number, method: PaymentMethod, promotionCode?: string) => {
        
        if(!Object.values(PaymentMethod).includes(method)) {
            throw new Error("Invalid payment method");
        }

        const transactionId = `TXN_${Date.now()}`;
        let status: PaymentStatus = PaymentStatus.PENDING;
        let amount = price;

        if(promotionCode) {
            const promotion = await Promotion.findOne({ code: promotionCode });
            if(!promotion) {
                throw new Error("Invalid promotion code");
            }
            amount = promotion.discount < price ? price - promotion.discount : 0;
        }  

        if(amount === 0) {
            status = PaymentStatus.SUCCESS;
        }
        else{
            switch (method) {
                case PaymentMethod.CASH:
                    status = PaymentStatus.PENDING;
                    break;
    
                case PaymentMethod.CREDIT_CARD:
                    // Giả lập xử lý thẻ tín dụng
                    const creditCardSuccess = true;
                    status = creditCardSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
                    break;
    
                case PaymentMethod.E_WALLET:
                    // Giả lập xử lý ví điện tử
                    const eWalletSuccess = true;
                    status = eWalletSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
                    break;
    
                default:
                    throw new Error("Unsupported payment method");
            }
        }

        // Tạo bản ghi payment
        const payment = new Payment({
            ticket_id: ticketId,
            amount,
            method,
            status,
            transaction_id: transactionId,
        });

        await payment.save();

        return payment;
    }

    getPaymentByTicketId = async (ticketId: string) => {
        const payment = await Payment.findOne({ ticket_id: ticketId });
        return payment;
    }
    
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