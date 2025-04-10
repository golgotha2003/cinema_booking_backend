import crypto from "crypto";
import axios from "axios";
import { MomoConfig } from "../config/momo.config";
import { CreatePaymentPayload, RefundPayload } from "../interfaces/iMomo";
import { generateSignature, getMomoURL } from "../utils/momo/momo.utils";

class MomoService {
  createPayment = async (config: MomoConfig, payload: CreatePaymentPayload) => {
    const {
      partnerCode,
      accessKey,
      secretKey,
      environment = "sandbox",
    } = config;
    const {
      requestId,
      orderId,
      amount,
      orderInfo,
      returnUrl,
      notifyUrl,
      extraData = "",
    } = payload;

    const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyUrl}&extraData=${extraData}`;
    const signature = generateSignature(rawSignature, secretKey);

    const body = {
      partnerCode,
      accessKey,
      requestId,
      orderId,
      amount,
      orderInfo,
      returnUrl,
      notifyUrl,
      extraData,
      requestType: "captureMoMoWallet",
      signature,
    };

    const res = await axios.post(getMomoURL(environment), body, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  };

  refundPayment = async (config: MomoConfig, payload: RefundPayload) => {
    const {
      partnerCode,
      accessKey,
      secretKey,
      environment = "sandbox",
    } = config;
    const { requestId, orderId, amount, transId } = payload;

    const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&transId=${transId}&requestType=refundMoMoWallet`;
    const signature = generateSignature(rawSignature, secretKey);

    const body = {
      partnerCode,
      accessKey,
      requestType: "refundMoMoWallet",
      requestId,
      orderId,
      amount,
      transId,
      signature,
    };

    const res = await axios.post(getMomoURL(environment), body, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  };
}

export default new MomoService();