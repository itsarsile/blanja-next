import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/dkim";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import "dotenv-flow/config";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    //@ts-ignore
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
  });

  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    ...data,
  });
};
