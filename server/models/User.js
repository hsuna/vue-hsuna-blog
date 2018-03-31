/*
 * @Description 模型-用户
 * @Author: Hsuan
 * @Date: 2018-03-25 12:06:52
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-01 03:32:05
 */
import mongoose from "mongoose";
import Refs from "./refs";
import { encryptHash } from "../utils/hash";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, unique: true }, //用户名
  password: { type: String }, //密码
  admin: { type: Boolean, default: false } //是否管理员
});

/** 使用pre中间件在用户信息存储前进行密码加密 */
UserSchema.pre("save", function(next, data) {
  encryptHash(this.password)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => {
      next(err);
    });
});

const User = mongoose.model(Refs.User, UserSchema);

export default User;
