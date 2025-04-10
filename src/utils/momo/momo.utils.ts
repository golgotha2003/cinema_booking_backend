import crypto from 'crypto';

export function generateSignature(rawData: string, secretKey: string): string {
  return crypto.createHmac('sha256', secretKey).update(rawData).digest('hex');
}

export function getMomoURL(env: 'sandbox' | 'live'): string {
  return env === 'sandbox'
    ? 'https://test-payment.momo.vn/gw_payment/transactionProcessor'
    : 'https://payment.momo.vn/gw_payment/transactionProcessor';
}
