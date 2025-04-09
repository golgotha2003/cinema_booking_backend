import mongoose, { Schema } from "mongoose";
import { ITicket } from "../interfaces/iTicket";
import { TicketStatus } from "../utils/ticket/status.enum";

const TicketSchema = new Schema<ITicket>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        showtime_id: {
            type: Schema.Types.ObjectId,
            ref: "Showtime",
            required: true,
        },
        seat_id: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: Object.values(TicketStatus),
            default: TicketStatus.UNPAID,
        },
    },
    {
        timestamps: true,    
    }
);


const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);

export default Ticket;