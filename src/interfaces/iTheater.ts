import { Document } from "mongoose";
import { TheaterStatus } from "../utils/theater/status.enum";

export interface ITheater extends Document {
    name: string;
    location: string;
    capacity: number;
    status: TheaterStatus;
}