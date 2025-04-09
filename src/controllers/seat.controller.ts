import { Request, Response } from "express";
import seatService from "../services/seat.service";
import { ISeat } from "../interfaces/iSeat";

class SeatController {
  getSeatsByTheaterId = async (req: Request, res: Response) => {
    try {
      const seats = await seatService.getSeatsByTheaterId(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Get seats by theater id successfully",
        data: seats,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Get seats by theater id failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  addSeat = async (req: Request, res: Response) => {
    try {
      const seat = req.body as ISeat;
      const newSeat = await seatService.addSeat(seat);
      return res.status(201).json({
        success: true,
        message: "Add seat successfully",
        data: newSeat,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Add seat failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  updateSeat = async (req: Request, res: Response) => {
    try {
      const seat = req.body as ISeat;
      const updatedSeat = await seatService.updateSeat(req.params.id, seat);
      return res.status(200).json({
        success: true,
        message: "Update seat successfully",
        data: updatedSeat,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Update seat failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  deleteSeat = async (req: Request, res: Response) => {
    try {
      await seatService.deleteSeat(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Delete seat successfully",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Delete seat failed",
        error: err instanceof Error ? err.message : err,
      });
    }
  };
}

export default new SeatController();