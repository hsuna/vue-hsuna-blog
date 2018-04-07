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
const updateUser = (id, user) => {
  return User.update({ _id: id }, { $set: user });
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
  updateUser,
  createUser
};
