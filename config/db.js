import mongoose from "mongoose";
import dotevn from "dotenv";

dotevn.config();

export default async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/kiwi`);
    console.log("CONNECTED SUCCESS...");
  } catch (error) {
    console.log("ERROR...");
  }
}
