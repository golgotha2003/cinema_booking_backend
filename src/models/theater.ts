import mongoose, { Schema } from "mongoose";
import { ITheater } from "../interfaces/iTheater";
import { TheaterStatus } from "../utils/theater/status.enum";

const TheaterSchema = new Schema<ITheater>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TheaterStatus),
      default: TheaterStatus.ACTIVE
    }
  },
  {
    timestamps: true,
  }
);

const Theater = mongoose.model<ITheater>("Theater", TheaterSchema);

export default Theater;