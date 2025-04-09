import 'express-session';

declare module 'express-session' {
    interface SessionData {
        otp?: {
            email: string;
            code: string;
            expiredAt: number;
        };
        access_token?: string;
    }
}
