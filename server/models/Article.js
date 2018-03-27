/*
 * @Description 模型-文章
 * @Author: Hsuan 
 * @Date: 2018-03-25 12:04:21 
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-27 10:54:22
 */
import mongoose from "mongoose";

const { Schema } = mongoose;

const Article = mongoose.model(
  "Article",
  new Schema({
    title: { type: String },  //标题
    classify: { type: String },  //类型
    content: { type: String },  //内容 
    about: { type: String },  //简介
    //comment: [{ body: String, date: Date }],
    tags: { type: Array }, //标签
    createdAt: { type: Number, default: Date.now }, //创建时间
    publishAt: { type: Number, default: Date.now }, //发布时间
    updateAt: { type: Number, default: Date.now }, //更新时间
    status: { type: Number, default: 0 },  //0:草稿-私有|1:草稿-公开|2:私有|3:公开
  })
);

export default Article;
