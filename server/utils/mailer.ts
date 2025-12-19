import nodemailer from "nodemailer";

export const sendOTPEmail = async (toEmail: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"SevaSetu" <${process.env.EMAIL_USER}>`, // sender
    to: toEmail,                                  // ✅ USER EMAIL
    subject: "SevaSetu Login OTP",
    html: `
      <h2>SevaSetu Login</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });
};
