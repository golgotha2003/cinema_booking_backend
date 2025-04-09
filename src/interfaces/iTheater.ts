import { Document } from "mongoose";

export interface ITheater extends Document {
    name: string;
    location: string;
    capacity: number;
}