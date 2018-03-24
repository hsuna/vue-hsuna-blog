import mongoose from "mongoose";

const { Schema } = mongoose;

const Article = mongoose.model(
  "Article",
  new Schema({
    title: String,
    body: String,
    classify: String,
    synopsis: String,
    comment: [{ body: String, date: Date }],
    tags: [{ title: String }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    mete: {
      vores: Number,
      favs: Number
    }
  })
);

export default Article;
