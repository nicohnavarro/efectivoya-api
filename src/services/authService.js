import { compare } from "bcrypt";
import JWT from "jsonwebtoken";
import { auth } from "../config/index.js";
import AppError from "../errors/appError.js";
import { findByEmail } from "./userService.js";
import UserRepository from "../repositories/userRepository.js";
const repository = new UserRepository();

const login = async (email, password) => {
  try {
    const user = await findByEmail(email);

    if (!user) {
      throw new AppError("User not found!", 401);
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new AppError("Authentication failed, Password invalid", 401);
    }

    const token = _encrypt({
      id: user.id,
      email: user.email,
      cedula: user.cedula,
      celular: user.celular,
      passOtp: user.passOtp,
      segmento: user.segmento,
    });

    return {
      token,
      user: user.email,
      id: user.id,
    };
  } catch (err) {
    throw err;
  }
};

const register = async (email, expiredTime) => {
  try {
    const user = await findByEmail(email);

    if (user) {
      throw new AppError("Mail already use!", 401);
    }

    const newUser = {
      email,
      expiredTime,
    };

    const returnUser = await repository.save(newUser);
    const tokenData = { id: returnUser.id, email: returnUser.email };
    const token = _encrypt(tokenData);
    return {
      user: returnUser.toJSON(),
      token: token,
    };
  } catch (err) {
    throw err;
  }
};

const validToken = async (token) => {
  try {
    if (!token) {
      throw new AppError("Authentication failed, token required", 401);
    }
    let id;
    try {
      const obj = JWT.verify(token, auth.secret);
      id = obj.id;
    } catch (verifyErr) {
      throw new AppError("Authentication failed, Error token", 402);
    }
    const user = await findById(id);
    if (!user) {
      throw new AppError("Authentication failed, Invalid token", 401);
    }
    if (!user.enable) {
      throw new AppError("Authentication failed, User is not enable", 401);
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const validRole = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new AppError("Authorization failed, User without permision", 403);
  }
  return true;
};

const _encrypt = (user) => {
  return JWT.sign(user, auth.secret, { expiresIn: "20d" });
};

export { login, register, validToken, validRole };
