import session from "express-session";

/**
 * Verify the OTP code
 * @param email user's email
 * @param otp OTP code
 * @param session user's session
 * @returns true if OTP is valid, false otherwise
 * @throws {Error} if OTP is invalid or expired
 */
export const verifyOtp = async (email: string, otp: string, session: session.Session & Partial<session.SessionData>): Promise<boolean> => {
    if (!email || !otp) throw new Error("Missing email or otp");

    // Check if OTP exists in session
    if (!session.otp) throw new Error("OTP not found");

    // Check if OTP has expired
    if (Date.now() > session.otp.expiredAt) {
        // Remove OTP from session if it has expired
        delete session.otp;
        throw new Error("OTP expired");
    }

    // Check if OTP is valid
    if (session.otp.code !== otp) throw new Error("Invalid OTP");

    // Remove OTP from session if it is valid
    delete session.otp;

    return true;
}
