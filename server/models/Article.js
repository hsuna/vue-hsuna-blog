/*
 * @Description 模型-文章
 * @Author: Hsuan 
 * @Date: 2018-03-25 12:04:21 
 * @Last Modified by: Hsuan
 * @Last Modified time: 2018-03-25 13:38:41
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
    tags: [{ title: String }], //标签
    createdAt: { type: Number, default: Date.now }, //创建时间
    updateAt: { type: Number, default: Date.now }, //更新时间
    hidden: { type: Boolean },  //
  })
);

export default Article;
