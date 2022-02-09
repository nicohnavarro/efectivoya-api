import nodemailer from "nodemailer";
import { emailConfig } from "../config/index.js";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // true for 465, false for other ports
  // port: 587,
  secure: true,
  auth: {
    user: emailConfig.email,
    pass: emailConfig.password,
  },
});

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });