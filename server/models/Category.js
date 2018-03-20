import mongoose from "../mongoose";

const { Schema } = mongoose;

module.exports = mongoose.model(
  "Category",
  new Schema({
    title: String
  })
);
