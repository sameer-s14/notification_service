import nodemailer from "nodemailer";
import {Config} from "../config"

export const sendMail = async (email: string, content: string) => {
    const mailTransporter = nodemailer.createTransport({
      service: Config.EMAIL_SERVICE,
      auth: {
        user: Config.EMAIL_USERNAME,
        pass: Config.EMAIL_PASSWORD,
      },
    });
    const mailDetails = {
      from: Config.EMAIL_USERNAME,
      to: email,
      subject: 'Please Verify Your Email',
      text: content,
    };
    await mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('error occurred in node mailer');
      } else {
        console.log('mail send succesfully.');
      }
    });
  };