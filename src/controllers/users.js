import { hash } from "bcrypt";
import { nanoid } from "nanoid";

import AppError from "../errors/appError.js";
import Success from "../handlers/successHandler.js";
import {
  findByCedula,
  findByEmail,
  findById,
  save,
  update,
} from "../services/userService.js";
import { sendResetPassword } from "../utils/mailer.js";

const checkCedula = async (req = request, res = response, next) => {
  try {
    const { id, cedula, email } = req.body;
    const user = await findByEmail(email);
    if (!user) {
      throw new AppError("No user", 401);
    } else {
      if (user.cedula == null) {
        res.json(new Success({ isNew: true }));
        return;
      } else {
        res.json(new Success({ user }));
      }
    }
  } catch (err) {
    next(err);
  }
};

const savePassword = async (req = request, res = response, next) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      res.json(new AppError("Save password failed, password required", 401));
    }
    const user = await findByEmail(email);
    const crypt_password = await hash(password, 10);
    if (!user) {
      const newUser = {
        email,
        password: crypt_password,
        userAgent: req.headers["user-agent"],
      };
      const saveUser = await save(newUser);
      res.json(new Success({ id: saveUser.id, email: saveUser.email }));
    } else {
      throw new AppError("Not found", 404);
    }
  } catch (err) {
    next(err);
  }
};

const saveCedulayCelular = async (req = request, res = response, next) => {
  try {
    const { id, cedula, celular } = req.body;
    const user = await findById(id);
    if (user) {
      const updateUser = await update(user.id, { ...user, cedula, celular });
      res.json(new Success({ updateUser }));
    } else {
      throw new AppError("Not found", 404);
    }
  } catch (err) {
    next(err);
  }
};

const savePassOpt = async (req = request, res = response, next) => {
  try {
    const { id } = req.body;
    const user = await findById(id);
    if (user) {
      const updateUser = await update(user.id, { ...user, passOpt: true });
      res.json(new Success({ updateUser }));
    } else {
      throw new AppError("User not found", 202);
    }
  } catch (err) {
    next(err);
  }
};

const saveSegmento = async (req = request, res = response, next) => {
  try {
    const { id, segmento } = req.body;
    const user = await findById(id);
    if (user) {
      const updateUser = await update(user.id, { ...user, segmento });
      res.json(new Success({ updateUser }));
    } else {
      throw new AppError("User not found", 202);
    }
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req = request, res = response, next) => {
  try {
    const { email } = req.body;

    const user = await findByEmail(email);

    if (!user) {
      throw new AppError("Not found", 404);
    }

    if (user) {
      const resetCode = nanoid();
      const updateUser = await update(user.id, {
        ...user,
        resetCode: resetCode,
      });
      await sendResetPassword(email, resetCode);
      res.json(new Success({ updateUser }));
    } else {
      throw new AppError("Not found", 404);
    }
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req = request, res = response, next) => {
  try {
    const { email, resetCode, password, passwordConfirmation } = req.body;
    if (password !== passwordConfirmation) {
      throw new AppError("Passwords are not equals", 401);
    }
    if (!resetCode) {
      throw new AppError("Not have code", 401);
    }

    const user = await findByEmail(email);

    if (!user.resetCode || user.resetCode !== resetCode) {
      throw new AppError("We sent you a code to validate", 401);
    }

    if (user) {
      const crypt_password = await hash(password, 10);
      const updateUser = await update(user.id, {
        ...user,
        password: crypt_password,
        resetCode: null,
      });
      res.json(new Success({ updateUser }));
    } else {
      throw new AppError("Not found", 404);
    }
  } catch (err) {
    next(err);
  }
};

export {
  checkCedula,
  savePassword,
  saveCedulayCelular,
  savePassOpt,
  saveSegmento,
  resetPassword,
  forgotPassword,
};
