/*
 * @Description 模型-用户
 * @Author: Hsuan
 * @Date: 2018-03-25 12:06:52
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-02 00:42:41
 */
import mongoose from "mongoose";
import Refs from "./refs";
import { encryptHash } from "../utils/hash";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, unique: true }, //用户名
  password: { type: String }, //密码
  admin: { type: Boolean, default: false }, //是否管理员
  introduction: { type: String }, //简介
  header: { type: String }, //头像
  background: { type: String }, //背景图
  about: { type: String } //关于我
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

export default mongoose.model(Refs.User, UserSchema);
