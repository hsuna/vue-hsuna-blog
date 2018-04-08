import { User } from "../models";
import { encryptHash } from "../utils/hash";

/**
 * 通过用户名获取用户信息
 * @param {string} name
 */
const getUserByName = name => {
  return User.findOne({ name });
};

/**
 * 更新用户
 * @param {number} id
 * @param {object} user
 */
const updateUserById = (id, user) => {
  return User.findByIdAndUpdate(id, { $set: user });
};

/**
 * 更新用户
 * @param {name} name
 * @param {object} user
 */
const updateUserByName = (name, user) => {
  return User.update({ name }, { $set: user });
};

/**
 * 创建用户
 * @param {object} user
 */
const createUser = user => {
  return new User(user).save();
};

export default {
  getUserByName,
  updateUserById,
  updateUserByName,
  createUser
};
