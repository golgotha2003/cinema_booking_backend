import { Request, Response } from "express";
import ticketService from "../services/ticket.service";

class TicketController {
    bookTicket = async (req: Request, res: Response) => {
        const { userId, showtimeId, seatId } = req.body;

        try {
            const ticket = await ticketService.bookTicket(userId, showtimeId, seatId);

            res.status(200).json({
                success: true,
                message: "Ticket booked successfully",
                data: ticket,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Ticket booking failed",
                error: error instanceof Error ? error.message : error,
            });
        }
    }

    cancelTicket = async (req: Request, res: Response) => {
        const { ticketId } = req.body;

        try {
            
            const ticket = await ticketService.cancelTicket(ticketId);
            
            res.status(200).json({
                success: true,
                message: "Ticket canceled successfully",
                data: ticket,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Ticket cancellation failed",
                error: error instanceof Error ? error.message : error,
            });
        }
    }

    getTicketsByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const tickets = await ticketService.getTicketsByUserId(userId);

            res.status(200).json({
                success: true,
                message: "Tickets retrieved successfully",
                data: tickets,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Ticket retrieval failed",
                error: error instanceof Error ? error.message : error,
            });
        }
    }

    getTicketsByShowtimeId = async (req: Request, res: Response) => {
        const { showtimeId } = req.params;

        try {
            const tickets = await ticketService.getTicketsByShowtimeId(showtimeId);

            res.status(200).json({
                success: true,
                message: "Tickets retrieved successfully",                
                data: tickets,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Ticket retrieval failed",
                error: error instanceof Error ? error.message : error,
            });
        }
    }

    getAvailableSeats = async (req: Request, res: Response) => {
        const { showtimeId } = req.params;

        try {
            const availableSeats = await ticketService.getAvailableSeats(showtimeId);            

            res.status(200).json({
                success: true,
                message: "Available seats retrieved successfully",
                data: availableSeats,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Available seat retrieval failed",
                error: error instanceof Error ? error.message : error,
            });
        }
    }
}

export default new TicketController();