/*
 * @Description 模型-用户
 * @Author: Hsuan
 * @Date: 2018-03-25 12:06:52
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-03 23:13:05
 */
import mongoose from "mongoose";
import Refs from "./refs";
import { encryptHash } from "../utils/hash";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, unique: true }, //用户名
  password: { type: String }, //密码
  email:{type: String},    //邮箱
  admin: { type: Boolean, default: false }, //是否管理员
  introduction: { type: String }, //简介
  header: { type: String }, //头像
  background: { type: String }, //背景图
  about: { type: String } //关于我
});

/** 使用pre中间件在用户信息存储前进行密码加密 */
const encryptHashByUser = function(next, user){
  if(user.password){
    encryptHash(user.password)
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(err => {
        next(err);
      });
  }else{
    next();
  }
}

UserSchema.pre("save", function(next, data){
  encryptHashByUser(next, this);
});
UserSchema.pre("update", function(next, data){
  encryptHashByUser(next, this._update['$set']);
});

export default mongoose.model(Refs.User, UserSchema);
