import { User } from "../models";

/**
 * 通过用户名获取用户信息
 * @param {string} name
 */
const getUserByName = name => {
  return User.findOne({ name }).exec();
};

/**
 * 创建用户
 * @param {object} user
 */
const createUser = user => {
  return User.create(user).exec();
};

export { getUserByName, createUser };
