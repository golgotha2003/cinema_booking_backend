import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

/**
 * Send an email to the user with OTP code
 * @param email user's email
 * @param otp OTP code
 * @returns true if success, false if failed
 */
export const sendEmail = async (email: string, otp: string) => {
    try {
        const mailOptions = {
            from: '"BOOKING_CINEMA" <no-reply@bookingcinema.com>',
            to: email,
            subject: "Your OTP Code",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px; text-align: center;">
                    <div style="max-width: 500px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: auto;">
                        <h2 style="color: #007bff; margin-bottom: 20px;">OTP Confirmation</h2>
                        <p style="font-size: 16px; color: #333; margin-bottom: 15px;">Your OTP code is:</p>
                        <h3 style="background: #007bff; color: white; padding: 12px 20px; display: inline-block; border-radius: 6px; font-size: 24px; letter-spacing: 2px;">${otp}</h3>
                        <p style="font-size: 14px; color: #777; margin-top: 15px;">This OTP is valid for <strong>5 minutes</strong>.</p>
                        <p style="font-size: 14px; color: #777;">If you did not request this code, please ignore this email.</p>
                    </div>
                </div>
            `,
        };
        

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        return true;
    } catch (error) {
        throw new Error(error as string);
    }
};
