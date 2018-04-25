/*
 * @Description 模型-清单
 * @Author: Hsuan
 * @Date: 2018-04-25 18:46:34
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 23:23:10
 */

import mongoose from "mongoose";
import Refs from "./refs";

const { Schema } = mongoose;

const InventorySchema = new Schema({
  title: { type: String, required: "{PATH} is required!" }, //名称
  content: { type: String, required: "{PATH} is required!" }, //内容
  createdAt: { type: Date, default: Date.now } //创建时间
});

export default mongoose.model(Refs.Inventory, InventorySchema);
