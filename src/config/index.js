import { config } from "dotenv";
import nodemailer from "nodemailer";

const envFound = config();

if (!envFound) {
  throw new Error("Couldn 't  find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";
export const landingURL = process.env.LANDING_URL;
export const port = process.env.PORT;
export const api = {
  prefix: "/api/v1",
};

export const log = {
  level: process.env.LOG_LEVEL,
};

export const database = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
};

export const auth = {
  secret: process.env.AUTH_SECRET,
  ttl: process.env.AUTH_TTL,
};

export const emailConfig = {
  email: process.env.EMAIL,
  password: process.env.EMAIL_PASSWORD,
};

export const swagger = {
  path: "/docs",
};

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

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages ✅");
  }
});
