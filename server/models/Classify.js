import mongoose from "mongoose";

const { Schema } = mongoose;

const Classify = mongoose.model(
  "Classify",
  new Schema({
    title: String
  })
);

export default Classify;
