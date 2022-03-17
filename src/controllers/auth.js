import JWT from "jsonwebtoken";
import { auth } from "../config/index.js";
import AppError from "../errors/appError.js";
import { sendEmail } from "../utils/mailsender.js";
import Success from "../handlers/successHandler.js";
import {
  findByCedula,
  findByCedulaAndEmail,
  findByEmail,
  findByEmailAndCedulaNotNull,
  save,
  update,
} from "../services/userService.js";
import add from "date-fns/add/index.js";

const login = async (req = request, res = response, next) => {
  try {
    const { email } = req.body;
    const token = _encrypt(email);
    console.log(token);
    const expiredTime = add(new Date(), { minutes: 15 });
    await sendEmail(email, token);
    const user = await save({ email, token, expiredTime });
    res.json(new Success({ user }));
  } catch (err) {
    throw err;
  }
};

const validToken = async (req = request, res = response, next) => {
  try {
    const { token } = req.body;
    console.log(token);
    if (!token) {
      res.json(new AppError("Authentication failed, token required", 401));
    }
    let email;
    try {
      const obj = JWT.verify(token, auth.secret);
      console.log(obj);
      email = obj.email;
      const user = await findByEmail(email);
      if (user) {
        update(user.id, { ...user, enable: true });
      }
      res.json(new Success({ email }));
    } catch (verifyErr) {
      console.log(verifyErr);
      res.json(new AppError("Authentication failed, Error token", 402));
    }
    return email;
  } catch (err) {
    res.json(err);
  }
};

const checkCedula = async (req = request, res = response, next) => {
  try {
    const { cedula, email } = req.body;
    const user = await findByCedulaAndEmail(cedula, email);
    console.log('1', user);
    if (!user) {
      const user2 = await findByEmailAndCedulaNotNull(email);
      if (!user2) {
        res.json(new AppError("User not found", 202));
      }
      else {
             res.json(new Success({ user:user2 }));
      }
    }
    else {
           res.json(new Success({ user }));
    }
  } catch (err) {
    res.json(err);
  }
};

const saveCedulayTelefono = async (req = request, res = response, next) => {
  try {
    const { email, cedula, telefono } = req.body;
    if (!email) {
      res.json(new AppError("Authentication failed, email required", 401));
    }
    const user = await findByEmail(email);
    if (user) {
      const updateUser = await update(user.id, { ...user, cedula, telefono });
      res.json(new Success({ updateUser }));
    } else {
      res.json(new AppError("Not found", 404));
    }
  } catch (err) {
    res.json(err);
  }
};

const _encrypt = (email) => {
  return JWT.sign({ email }, auth.secret, { expiresIn: auth.ttl });
};

export { login, validToken, checkCedula, saveCedulayTelefono };
