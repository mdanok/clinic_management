import nodemailer from "nodemailer";
import EmailVerificationTemplate from "@/components/Email/Body";
import { render } from "@react-email/render";

async function sendMail({ email, verificationToken }) {
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

export async function POST() {
  try {
    await sendMail({
      email: "dracox222@gmail.com",
      verificationToken: "123456",
    });
    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch (errorr) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

/*import VercelInviteUserEmail from "@/components/Email/Body";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "MediManage Verification <onboarding@resend.dev>",
      to: ["dracox222@gmail.com"],
      subject: "Verify Your Email to Complete Registration",
      react: VercelInviteUserEmail({
        email: "dracox222@gmail.com",
        verificationLink: `http://localhost:3000/verify?token=dracox222@gmail.com`,
      }),
    });

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
*/
