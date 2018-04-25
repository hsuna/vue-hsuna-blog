/*
 * @Description 模型-随说
 * @Author: Hsuan
 * @Date: 2018-04-25 12:04:21
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-25 19:43:18
 */
import mongoose from "mongoose";
import Refs from "./refs";

const { Schema } = mongoose;

const EssaySchema = new Schema({
  content: { type: String }, //内容
  files: [
    {
      id: { type: String }, //文件ID
      name: { type: String }, //文件名
      url: { type: String } //文件路径
    }
  ], //文件集合
  createdAt: { type: Date, default: Date.now }, //创建时间
  praiseCount: { type: Number, default: 0 } //点赞次数
});

export default mongoose.model(Refs.Essay, EssaySchema);
