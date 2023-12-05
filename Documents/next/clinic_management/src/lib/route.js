import nodemailer from "nodemailer";
import EmailVerificationTemplate from "@/components/Email/Body";
import { render } from "@react-email/render";

export async function sendMail({ email, verificationToken }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_VERIFY_USER,
      pass: process.env.EMAIL_VERIFY_PASS,
    },
  });

  const emailHtml = render(
    <EmailVerificationTemplate
      email={email}
      verificationLink={verificationToken}
    />
  );

  const mailOptions = {
    from: `MediManage Verification <${process.env.EMAIL_VERIFY_USER}>`,
    to: email,
    subject: "Verify Your Email to Complete Registration",
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
