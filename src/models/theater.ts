import mongoose, { Schema } from "mongoose";
import { ITheater } from "../interfaces/iTheater";

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
  },
  {
    timestamps: true,
  }
);

const Theater = mongoose.model<ITheater>("Theater", TheaterSchema);

export default Theater;