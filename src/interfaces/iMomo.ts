export interface CreatePaymentPayload {
  requestId: string;
  orderId: string;
  amount: string;
  orderInfo: string;
  returnUrl: string;
  notifyUrl: string;
  extraData?: string;
}

export interface RefundPayload {
  requestId: string;
  orderId: string;
  amount: string;
  transId: string;
}
