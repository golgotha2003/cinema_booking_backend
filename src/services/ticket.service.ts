import Seat from "../models/seat";
import Showtime from "../models/showtime";
import Ticket from "../models/ticket";
import { SeatStatus } from "../utils/seat/status.enum";
import { TicketStatus } from "../utils/ticket/status.enum";
import { ticketPrice } from "../validator/ticketPrice";

class TicketService {
    /**
     * Book ticket by user id, showtime id, and seat id
     * @param userId User id
     * @param showtimeId Showtime id
     * @param seatId Seat id
     */
    bookTicket = async (userId: string, showtimeId: string, seatId: string, ) => {
        const seat = await Seat.findById(seatId);

        if(!seat) {
            throw new Error("Seat not found");
        }

        if(seat.status === 'disabled') {
            throw new Error("Seat is disabled");
        }

        if(seat.status === 'booked') {
            throw new Error("Seat is already booked");
        }

        seat.status = SeatStatus.PENDING;
        await seat.save();

        const ticket = new Ticket({
            user_id: userId,
            showtime_id: showtimeId,
            seat_id: seatId,
            price: ticketPrice(showtimeId, seatId),
            status: TicketStatus.UNPAID
        });
        
        await ticket.save();

        return ticket;
    }

    /**
     * Cancel ticket by ticket id
     * @param ticketId Ticket id
     */
    cancelTicket = async (ticketId: string) => {
        const ticket = await Ticket.findById(ticketId);

        if(!ticket) {
            throw new Error("Ticket not found");
        }

        if(ticket.status === TicketStatus.USED) {
            throw new Error("Ticket is already used");
        }

        if(ticket.status === TicketStatus.PAID) {
            throw new Error("Ticket is already paid");
        }

        if(ticket.status === TicketStatus.UNPAID) {
            ticket.status = TicketStatus.CANCELLED;
            await ticket.save();
        }

        return ticket;
    }

    /**
     * Get all tickets by showtime id
     * @param showtimeId Showtime id
     */
    getTicketsByShowtimeId = async (showtimeId: string) => {
        const tickets = await Ticket.find({showtime_id: showtimeId});
        return tickets;
    }

    /**
     * Get all tickets by user id
     * @param userId User id
     */
    getTicketsByUserId = async (userId: string) => {
        const tickets = await Ticket.find({user_id: userId});
        return tickets;
    }

    getTicketById = async (ticketId: string) => {
        const ticket = await Ticket.findById(ticketId);
        if(!ticket) {
            throw new Error("Ticket not found");
        }
        return ticket;
    }

    /**
     * Validate ticket
     * @param ticketId Ticket id
     */
    validateTicket = async (ticketId: string): Promise<boolean> => {
        const ticket = await Ticket.findById(ticketId);
        if(!ticket) {
            throw new Error("Ticket not found");
        }

        if(ticket.status === TicketStatus.USED) {
            throw new Error("Ticket is already used");
        }
        
        if(ticket.status === TicketStatus.UNPAID) {
            throw new Error("Ticket is not paid. Please pay first");
        }
        
        const showtime = await Showtime.findById(ticket.showtime_id);
        if(!showtime) {
            throw new Error("Showtime not found");
        }
        if(new Date(showtime.start_time) < new Date()) {
            throw new Error("Ticket is expired");
        }

        return true;
    }

    /**
     * Get all available seats by showtime id
     * @param showtimeId Showtime id
     */
    getAvailableSeats = async (showtimeId: string) => {
        const availableSeats = await Seat.find({showtime_id: showtimeId, status: SeatStatus.AVAILABLE});
        return availableSeats;
    }
}

export default new TicketService();