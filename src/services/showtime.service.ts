import { IShowtime } from "../interfaces/iShowtime";
import Showtime from "../models/showtime";

/**
 * Service class for showtime model
 */
class ShowtimeService {
    /**
     * Create a new showtime
     * @param showtime 
     */
    createShowtime = async (showtime: IShowtime) => {
        const existingShowtime = await Showtime.findOne({
            movie_id: showtime.movie_id,
            theater_id: showtime.theater_id,
            start_time: showtime.start_time,
            end_time: showtime.end_time,
        });

        if (existingShowtime) throw new Error("Showtime already exist");

        const newShowtime = new Showtime(showtime);
        await newShowtime.save();

        return newShowtime;
    }

    /**
     * Update a showtime
     * @param id 
     * @param showtime 
     */
    updateShowtime = async (id: string, showtime: IShowtime) => {
        const existingShowtime = await Showtime.findById(id);

        if (!existingShowtime) throw new Error("Showtime not found");

        existingShowtime.movie_id = showtime.movie_id;
        existingShowtime.theater_id = showtime.theater_id;
        existingShowtime.start_time = showtime.start_time;
        existingShowtime.end_time = showtime.end_time;

        await existingShowtime.save();

        return existingShowtime;
    }

    /**
     * Delete a showtime
     * @param id 
     */
    deleteShowtime = async (id: string) => {
        const existingShowtime = await Showtime.findById(id);

        if (!existingShowtime) throw new Error("Showtime not found");

        await existingShowtime.deleteOne();
    }

    /**
     * Get all showtimes
     */
    getAllShowtimes = async () => {
        const showtimes = await Showtime.find();
        return showtimes;
    }

    /**
     * Get a showtime by id
     * @param id 
     */
    getShowtimeById = async (id: string) => {
        const showtime = await Showtime.findById(id);

        if (!showtime) throw new Error("Showtime not found");

        return showtime;
    }

    /**
     * Get showtimes by movie
     * @param movieId 
     */
    getShowtimesByMovie = async (movieId: string) => {
        const showtimes = await Showtime.find({ movie_id: movieId });

        if (!showtimes) throw new Error("Showtimes not found");

        return showtimes;
    }

    /**
     * Get showtimes by theater
     * @param theaterId 
     */
    getShowtimesByTheater = async (theaterId: string) => {
        const showtimes = await Showtime.find({ theater_id: theaterId });

        if (!showtimes) throw new Error("Showtimes not found");

        return showtimes;
    }

    /**
     * Get showtimes by date
     * @param date 
     */
    getShowtimesByDate = async (date: Date) => {
        const showtimes = await Showtime.find({ start_time: { $gte: date } });

        if (!showtimes) throw new Error("Showtimes not found");

        return showtimes;
    }

    /**
     * Get available seats for a showtime
     * @param showtimeId 
     */
    getAvailableSeats = async (showtimeId: string) => {
        const showtime = await Showtime.findById(showtimeId);

        if (!showtime) throw new Error("Showtime not found");

        const availableSeats = await Showtime.aggregate([
            { $match: { _id: showtimeId } },
            { $unwind: "$seats" },
            { $match: { "seats.status": "available" } },
            { $project: { "seats.seat_number": 1 } },
        ]);

        return availableSeats;
    }

}

export default new ShowtimeService();