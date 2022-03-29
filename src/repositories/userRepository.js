import { hash } from "bcrypt";
import User from "../models/user.js";
import { Op } from "sequelize";
class UserRepository {
  constructor() {}

  async findAll() {
    return await User.findAll();
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async findByEmail(email) {
    return await User.findOne({
      where: { email },
      order: [["createdAt", "DESC"]],
    });
  }
  async findByEmailAndCedulaNotNull(email) {
    return await User.findOne({
      where: { email, cedula: { [Op.not]: null } },
      order: [["createdAt", "DESC"]],
    });
  }

  async findByCedula(cedula) {
    return await User.findOne({
      where: { cedula },
      order: [["createdAt", "DESC"]],
    });
  }

  async findByCedulaAndEmail(cedula, email) {
    return await User.findOne({
      where: { cedula, email },
      order: [["createdAt", "DESC"]],
    });
  }

  async save(user) {
    return await User.create(user);
  }

  async update(id, user) {
    return await User.update(user, {
      where: {
        id,
      },
    });
  }

  async remove(id) {
    return await User.destroy({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
