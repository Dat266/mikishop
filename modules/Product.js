import { Schema, models, model } from "mongoose";

const Product = new Schema({
  image: { type: String, require: true },
});

export default models.Product || model("Product", Product);
