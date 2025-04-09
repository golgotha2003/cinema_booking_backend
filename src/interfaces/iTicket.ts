import { Document, Types } from "mongoose";
import { TicketStatus } from "../utils/ticket/status.enum";

export interface ITicket extends Document {
    user_id: Types.ObjectId;
    showtime_id: Types.ObjectId;
    seat_id: string;
    price: number;
    status: TicketStatus;
}