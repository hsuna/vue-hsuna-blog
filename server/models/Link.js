/*
 * @Description 模型-链接
 * @Author: Hsuan
 * @Date: 2018-04-25 18:46:34
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 23:23:00
 */

import mongoose from "mongoose";
import Refs from "./refs";

const { Schema } = mongoose;

const LinkSchema = new Schema({
  name: { type: String, required: "{PATH} is required!" }, //名称
  url: { type: String, required: "{PATH} is required!" }, //路径
  createdAt: { type: Date, default: Date.now } //创建时间
});

export default mongoose.model(Refs.Link, LinkSchema);
