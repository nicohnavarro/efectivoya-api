import JWT from "jsonwebtoken";

import { auth } from "../config/index.js";

import AppError from "../errors/appError.js";
import Success from "../handlers/successHandler.js";
import { findByEmail } from "../services/userService.js";

import {
  login as _login,
  register as _register,
  loginWithApp as _loginWithApp,
} from "../services/authService.js";
import { sendConfirmationEmail } from "../utils/mailer.js";

const login = async (req = request, res = response, next) => {
  const { email, password } = req.body;
  try {
    res.json(new Success(await _login(email, password)));
  } catch (error) {
    next(error);
  }
};

const loginWithApp = async (req = request, res = response, next) => {
  const { email } = req.body;
  try {
    res.json(new Success(await _loginWithApp(email)));
  } catch (error) {
    next(error);
  }
};

const register = async (req = request, res = response, next) => {
  try {
    const { email } = req.body;
    const user = await findByEmail(email);
    if (user) {
      throw new AppError("Email already use", 401);
    }
    const token = _encrypt(email);
    await sendConfirmationEmail(email, token);
    res.json(new Success({ email, token }));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validToken = async (req = request, res = response, next) => {
  try {
    const token = req.headers.authorization || req.body.token;
    if (!token) {
      throw new AppError("Authentication failed, token required", 401);
    }
    const { email } = JWT.verify(token, auth.secret);
    res.json(new Success({ email }));
  } catch (err) {
    next(err);
  }
};

const _encrypt = (email) => {
  return JWT.sign({ email }, auth.secret, { expiresIn: auth.ttl });
};

export { login, loginWithApp, register, validToken };
