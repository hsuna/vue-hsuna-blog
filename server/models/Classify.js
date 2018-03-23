import mongoose from "mongoose";

const { Schema } = mongoose;

module.exports = mongoose.model(
  "Classify",
  new Schema({
    title: String
  })
);
