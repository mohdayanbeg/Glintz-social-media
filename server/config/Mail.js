import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()


const transporter = nodemailer.createTransport({
    service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
})


const sendMail = async (to, otp) => {
    try {
        await transporter.sendMail({
            from: `${process.env.EMAIL}`,
            to,
            subject: "GlintZ Password Reset Request",
            html: `
                <p>Hello,</p>
                <p>We received a request to reset the password for your account. Please use the following One-Time Password (OTP) to proceed:</p>
                <h2 style="text-align: center; color: #DC2626; font-size: 24px;">${otp}</h2><p>This code is only valid for the next 5 minutes.</p><p>If you did not request a password reset, please disregard this email. Your password will remain unchanged.</p><p>Best regards,<br>The Glintz Team</p>
            `
        })
        console.log("OTP email sent successfully to", to);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Failed to send OTP email");
    }
}

export default sendMail