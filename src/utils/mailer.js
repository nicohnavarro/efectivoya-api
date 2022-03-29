import { transporter } from "../config/index.js";
import generateConfirmEmailTemplate from "./confirmEmail.js";
import generateResetPasswordTemplate from "./resetPassword.js";
import logger from "../loaders/logger/index.js";

export const sendConfirmationEmail = async (email, token) => {
  const emailOptions = generateConfirmEmailTemplate(email, token);
  try {
    await transporter.sendMail(emailOptions);
    logger.info("📬 Email send");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sendResetPassword = async (email, token) => {
  const emailOptions = generateResetPasswordTemplate(email, token);
  try {
    await transporter.sendMail(emailOptions);
    logger.info("📬 Email send");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
