import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const Storerefresh = new Schema(
  {
    userId: { type: String },
    refreshtoken: { type: String },
  },
  {
    timestamps: true,
  }
);

export default models.Storerefresh ||
  mongoose.model("Storerefresh", Storerefresh);
