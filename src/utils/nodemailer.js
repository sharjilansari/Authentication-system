import nodemailer from "nodemailer";
import { htmlContentReader } from "./htmlFileReader.js";

const sendEmail = async (email, subject, message) => {
  let path;
  if (subject === "Email Verification") {
    path = "../templates/email-verification.html";
  } else {
    path = "../templates/reset-password.html";
  }

  const html = htmlContentReader(path, message);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      service: process.env.NODEMAILER_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: subject,
      text: message,
      html: html,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

export { sendEmail };
