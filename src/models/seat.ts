import mongoose, { Schema } from "mongoose";
import { ISeat } from "../interfaces/iSeat";
import { SeatType } from "../utils/seat/type.enum";
import { SeatStatus } from "../utils/seat/status.enum";

const SeatSchema = new Schema<ISeat>(
  {
    theater_id: {
      type: Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    row: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    seat_number: {
      type: String,
      default: function () {
        return `${this.row}${this.number}`;
      },
    },
    type: {
      type: String,
      enum: Object.values(SeatType),
      default: SeatType.STANDARD,
    },
    status: {
      type: String,
      enum: Object.values(SeatStatus),
      default: SeatStatus.AVAILABLE,
    }
  },
  {
    timestamps: true,
  }
);

const Seat = mongoose.model<ISeat>("Seat", SeatSchema);

export default Seat;