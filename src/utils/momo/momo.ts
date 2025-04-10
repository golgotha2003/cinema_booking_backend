import { MomoConfig } from "../../config/momo.config";
import momoService from "../../services/momo.service";

class MomoPayment {
  constructor(private readonly config: MomoConfig) {
    config.partnerCode = process.env.MOMO_PARTNER_CODE!;
    config.accessKey = process.env.MOMO_ACCESS_KEY!;
    config.secretKey = process.env.MOMO_SECRET_KEY!;
    config.environment = process.env.MOMO_ENVIRONMENT! as 'sandbox' | 'live';
  }

  createPayment = (payload: Parameters<typeof momoService.createPayment>[1]) =>
    momoService.createPayment(this.config, payload);

  refundPayment = (payload: Parameters<typeof momoService.refundPayment>[1]) =>
    momoService.refundPayment(this.config, payload);
}

export default MomoPayment;