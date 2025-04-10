import { ITheater } from "../interfaces/iTheater";
import Theater from "../models/theater";
import { TheaterStatus } from "../utils/theater/status.enum";
import seatService from "./seat.service";


/**
 * Service class for managing theaters
 */
class TheaterService {
    /**
     * Get all theaters
     */
    getAllTheaters = async () => {
        const theaters = await Theater.find();
        return theaters;
    }

    /**
     * Get theater by id
     * @param id - Id of the theater
     */
    getTheaterById = async (id: string) => {
        const theater = await Theater.findById(id);
        return theater;
    }

    /**
     * Add a new theater
     * @param theater - Theater to add
     */
    addTheater = async (theater: ITheater) => {
        const existingTheater = await Theater.findOne({theater: theater.name});

        if(existingTheater) throw new Error("Theater alrealy exist.");

        const newTheater = new Theater(theater);

        await newTheater.save();

        return newTheater;
    }

    /**
     * Update a theater
     * @param id - Id of the theater
     * @param theater - Theater to update
     */
    updateTheater = async (id: string, theater: ITheater) => {
        const existingTheater = await Theater.findById(id);

        if(!existingTheater) throw new Error("Theater not found.");

        existingTheater.name = theater.name;
        existingTheater.location = theater.location;
        existingTheater.capacity = theater.capacity;

        await existingTheater.save();

        return existingTheater;
    }

    /**
     * Delete a theater
     * @param id - Id of the theater
     */
    deleteTheater = async (id: string) => {
        const theater = await Theater.findByIdAndDelete(id);
        
        if(!theater) throw new Error("Theater not found.");

        await theater.deleteOne();
    }

    /**
     * Disable a theater
     * @param id - Id of the theater
     */
    disableTheater = async (id: string) => {
        const theater = await Theater.findById(id);

        if(!theater) throw new Error("Theater not found.");

        theater.status = TheaterStatus.DISABLED;

        await seatService.disableSeatsByTheaterId(id);

        await theater.save();
    }
}

export default new TheaterService();

