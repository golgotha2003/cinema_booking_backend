import cron from "node-cron";
import { updatePromotionStatus, updateShowtimeStatus } from "../../services/update_status.service";

export const startCronJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    await updateShowtimeStatus();

    const now = new Date();
    if(now.getMinutes() === 0) {
      await updatePromotionStatus();
    }
  });
}
