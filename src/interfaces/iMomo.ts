export interface CreatePaymentPayload {
  requestId: string;
  orderId: string;
  amount: number;
  orderInfo: string;
  returnUrl: string;
  notifyUrl: string;
  extraData?: string;
}

export interface RefundPayload {
  requestId: string;
  orderId: string;
  amount: number;
  transId: string;
}
