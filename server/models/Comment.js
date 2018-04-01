/*
 * @Description 模型-评论
 * @Author: Hsuan
 * @Date: 2018-03-25 12:04:21
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-01 11:36:47
 */
import mongoose from "mongoose";
import Refs from "./refs";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  articleId: { type: Schema.Types.ObjectId },
  name: { type: String }, //评论人
  email: { type: String }, //评论邮箱
  content: { type: String }, //评论内容
  createdAt: { type: Number, default: Date.now } //评论时间
});

export default mongoose.model(Refs.Comment, CommentSchema);
