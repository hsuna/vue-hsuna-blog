/*
 * @Description 模型-文章
 * @Author: Hsuan
 * @Date: 2018-03-25 12:04:21
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-01 20:32:53
 */
import mongoose from "mongoose";
import Refs from "./refs";

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: { type: String }, //标题
  classify: { type: String }, //类型
  content: { type: String }, //内容
  about: { type: String }, //简介
  comments: [{ type: Schema.Types.ObjectId, ref: Refs.Comment }], //评论集合
  tags: { type: Array }, //标签
  createdAt: { type: Date, default: Date.now }, //创建时间
  publishAt: { type: Date, default: Date.now }, //发布时间
  updatedAt: { type: Date, default: Date.now }, //更新时间
  viewCount: { type: Number, default: 0 }, //浏览次数
  status: { type: Number, default: 0 } //0:草稿-私有|1:草稿-公开|2:私有|3:公开
});

export default mongoose.model(Refs.Article, ArticleSchema);
