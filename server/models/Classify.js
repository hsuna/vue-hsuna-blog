/*
 * @Description  模型-类型
 * @Author: Hsuan
 * @Date: 2018-03-25 12:06:10
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-01 13:06:42
 */
import mongoose from "mongoose";
import Refs from "./refs";

const { Schema } = mongoose;

const ClassifySchema = new Schema({
  title: { type: String, unique: true }, //类型
  createdAt: { type: Number, default: Date.now }, //创建时间
  updatedAt: { type: Number, default: Date.now } //更新时间
});

export default mongoose.model(Refs.Classify, ClassifySchema);
