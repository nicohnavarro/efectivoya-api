import UserRepository from "../repositories/userRepository.js";
const repository = new UserRepository();

const findAll = async () => {
  return await repository.findAll();
};

const findById = async (id) => {
  return await repository.findById(id);
};

const findByEmail = async (email) => {
  return await repository.findByEmail(email);
};

const findByCedula = async (cedula) => {
  return await repository.findByCedula(cedula);
};

const save = async (user) => {
  return await repository.save(user);
};

const update = async (id, user) => {
  return await repository.update(id, user);
};

const remove = async (id) => {
  return await repository.remove(id);
};

export {
  findAll,
  findById,
  findByEmail,
  findByCedula,
  save,
  update,
  remove,
};
