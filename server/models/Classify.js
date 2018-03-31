/*
 * @Description  模型-类型
 * @Author: Hsuan
 * @Date: 2018-03-25 12:06:10
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-25 13:38:41
 */
import mongoose from "mongoose";

const { Schema } = mongoose;

const Classify = mongoose.model(
  "Classify",
  new Schema({
    title: { type: String, unique: true }, //类型
    createdAt: { type: Number, default: Date.now }, //创建时间
    updatedAt: { type: Number, default: Date.now }, //更新时间
  })
);

export default Classify;
