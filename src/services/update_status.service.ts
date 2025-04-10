import Promotion from "../models/promotion";
import Showtime from "../models/showtime";
import { PromotionStatus } from "../utils/promotion/status.enum";
import { ShowtimeStatus } from "../utils/showtime/status.enum";

export const updateShowtimeStatus = async () => {
  const now = Date.now();

  const bulkOps = [];

  bulkOps.push({
    updateMany: {
      filter: {
        start_time: { $gt: now },
        status: { $ne: ShowtimeStatus.COMING_SOON },
      },
      update: { $set: { status: ShowtimeStatus.COMING_SOON } },
    },
  });

  bulkOps.push({
    updateMany: {
      filter: {
        start_time: { $lte: now },
        end_time: { $gte: now },
        status: { $ne: ShowtimeStatus.NOW_SHOWING },
      },
      update: { $set: { status: ShowtimeStatus.NOW_SHOWING } },
    },
  });

  bulkOps.push({
    updateMany: {
      filter: { end_time: { $lt: now }, status: { $ne: ShowtimeStatus.ENDED } },
      update: { $set: { status: ShowtimeStatus.ENDED } },
    },
  });

  try {
    await Showtime.bulkWrite(bulkOps);
  } catch (error) {
    console.error("Showtime cron error:", error);
  }
};

export const updatePromotionStatus = async () => {
  const now = new Date();

  const bulkOps = [];

  bulkOps.push({
    updateMany: {
      filter: {
        start_date: { $lte: now },
        end_date: { $gte: now },
        status: { $ne: PromotionStatus.ACTIVE },
      },
      update: { $set: { status: PromotionStatus.ACTIVE } },
    },
  });

  bulkOps.push({
    updateMany: {
      filter: {
        start_date: { $gt: now },
        status: { $ne: PromotionStatus.COMING_SOON },
      },
      update: { $set: { status: PromotionStatus.COMING_SOON } },
    },
  });

  bulkOps.push({
    updateMany: {
      filter: {
        end_date: { $lt: now },
        status: { $ne: PromotionStatus.EXPIRED },
      },
      update: { $set: { status: PromotionStatus.EXPIRED } },
    },
  });

  try {
    await Promotion.bulkWrite(bulkOps);
  } catch (error) {
    console.error("Promotion cron error:", error);
  }
};
