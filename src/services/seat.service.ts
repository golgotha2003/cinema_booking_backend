import { ISeat } from "../interfaces/iSeat";
import Seat from "../models/seat";
import { SeatStatus } from "../utils/seat/status.enum";

/**
 * Service class for managing seats.
 */
class SeatService {

    /**
     * Get all seats by theater id.
     * @param theaterId The id of the theater.
     * @returns A list of seats.
     */
    getSeatsByTheaterId = async (theaterId: string) => {
        const seats = await Seat.find({theater_id: theaterId});

        return seats;
    }

    /**
     * Add a new seat.
     * @param seat The seat to add.
     * @returns The added seat.
     */
    addSeat = async (seat: ISeat) => {
        const existingSeat = await Seat.findOne({seat_number: seat.seat_number, theater_id: seat.theater_id});
        if (existingSeat) throw new Error("Seat already exist");

        const newSeat = new Seat(seat);
        await newSeat.save();

        return newSeat;
    }

    /**
     * Update an existing seat.
     * @param id The id of the seat to update.
     * @param seat The updated seat.
     * @returns The updated seat.
     */
    updateSeat = async (id: string, seat: ISeat) => {
        const existingSeat = await Seat.findById(id);
        if (!existingSeat) throw new Error("Seat not found");

        existingSeat.row = seat.row;
        existingSeat.number = seat.number;
        existingSeat.type = seat.type;
        existingSeat.status = seat.status;

        await existingSeat.save();

        return existingSeat;
    }

    /**
     * Disable all seats by theater id.
     * @param theaterId The id of the theater.
     */
    disableSeatsByTheaterId = async (theaterId: string) => {
        await Seat.updateMany(
            { theater: theaterId, status: { $ne: SeatStatus.DISABLED } },
            { status: SeatStatus.DISABLED }
        );
    }
    

    /**
     * Delete a seat.
     * @param id The id of the seat to delete.
     */
    deleteSeat = async (id: string) => {
        const existingSeat = await Seat.findById(id);
        if (!existingSeat) throw new Error("Seat not found");

        await existingSeat.deleteOne();
    }
}

export default new SeatService();

