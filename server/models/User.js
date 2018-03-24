import mongoose from "mongoose";
import { encryptHash } from "../utils/hash";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, unique: true },
  password: { type: String, unique: true },
  admin: { type: Boolean, default: false }
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

const User = mongoose.model("User", UserSchema);

export default User;
