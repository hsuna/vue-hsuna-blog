import mongoose from "mongoose";

const { Schema } = mongoose;

module.exports = mongoose.model(
  "Article",
  new Schema({
    title: String,
    body: String,
    antuor: String,
    category: String,
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
