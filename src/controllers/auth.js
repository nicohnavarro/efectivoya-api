import JWT from "jsonwebtoken";
import { auth } from "../config/index.js";
import AppError from "../errors/appError.js";
import { sendEmail } from "../utils/mailsender.js";
import Success from "../handlers/successHandler.js";
import { findByEmail, save, update } from "../services/userService.js";
import add from "date-fns/add/index.js";

const login = async (req = request, res = response, next) => {
  try {
      const { email } = req.body;
    const token = _encrypt(email);
    console.log(token);
    const expiredTime = add(new Date(), { minutes: 15 });
    await sendEmail(email, token);
    await save({email,token,expiredTime})
    res.json(new Success({ token }));
  } catch (err) {
    throw err;
  }
};

const validToken = async (req = request, res = response, next) => {
  try {
    const { token } = req.body;
    console.log(token)
    if (!token) {
      res.json(new AppError("Authentication failed, token required", 401));
    }
    let email;
    try {
      const obj = JWT.verify(token, auth.secret);
      console.log(obj)
      email = obj.email;
      const user = await findByEmail(email);
      if (user) {
        update(user.id,{...user,enable:true})
      }
          res.json(new Success({ email }));
    } catch (verifyErr) {
      console.log(verifyErr)
      res.json(new AppError("Authentication failed, Error token", 402));
    }
    return email;
  } catch (err) {
    res.json(err);
  }
};


const _encrypt = (email) => {
  return JWT.sign({ email }, auth.secret, { expiresIn: auth.ttl });
};

export { login, validToken };