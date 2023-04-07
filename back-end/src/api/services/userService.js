const { 
  comparePassword,
  generateToken,
  verifyToken,
 } = require('../utils/cryptoJWT');

const { User } = require('../../database/models');

const createUser = async (userData) => {
  const user = await User.create(userData);
  const token = await generateToken(user.id);
  return { user, token };
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getByEmailandPassword = async (reqEmail, password) => {
  const user = await User.findOne({ where: { email: reqEmail } });
  const { id, name, email, role } = user.dataValues;
  const validate = comparePassword(password, user.dataValues.password);
  if (!validate) {
    throw new Error('Invalid password');
  }
  const token = await generateToken(user.id);
  return { token, name, email, role, id };
};
const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
const userValidation = async (token) => {
  const userId = await verifyToken(token);
  const result = !!userId;
  return result;
};
module.exports = {
  getByEmailandPassword,
  createUser,
  getByEmail,
  getUserById,
  getUserByEmail,
  userValidation, 
};
