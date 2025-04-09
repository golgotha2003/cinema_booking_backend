import paymentService from '../services/payment.service';
import ticketService from '../services/ticket.service';
import userService from '../services/user.service';
import { PaymentMethod } from './../utils/payment/method.enum';
import { Request, Response } from "express";

class PaymentController {
    processPayment = async (req: Request, res: Response) => {
        try{
            const { ticketId, paymentMethod, promotionCode } = req.body;

        const ticket = await ticketService.getTicketById(ticketId);

        const payment = await paymentService.processPayment(ticketId, ticket.price, paymentMethod as PaymentMethod, promotionCode);

        res.status(200).json({
            success: true,
            message: "Payment processed successfully",
            data: payment,
        });
        }
        catch(err){
            res.status(400).json({
                success: false,
                message: "Payment processing failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    getPaymentByTicketId = async (req: Request, res: Response) => {
        try{
            const { ticketId } = req.params;
            const payment = await paymentService.getPaymentByTicketId(ticketId);
            res.status(200).json({
                success: true,
                message: "Get payment by ticket id successfully",
                data: payment,
            });
        }
        catch(err){
            res.status(400).json({    
                success: false,
                message: "Get payment by ticket id failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

    refundPayment = async (req: Request, res: Response) => {
        try{
            const { paymentId } = req.params;
            const payment = await paymentService.refundPayment(paymentId);
            res.status(200).json({
                success: true,
                message: "Refund payment successfully",
                data: payment,
            });
        }
        catch(err){
            res.status(400).json({
                success: false,
                message: "Refund payment failed",
                error: err instanceof Error ? err.message : err,
            });
        }
    }

}

export default new PaymentController();