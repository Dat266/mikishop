import verifytoken from "../../../middleware/verifytoken";
import authAdmin from "../../../middleware/authAmin";
import mongoose from "mongoose";
import { cloudinary } from "../../../config/cloudinary";
import connect from "../../../config/db";
import Product from "../../../modules/Product";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
const handleImage = async (req, res) => {
  await connect();
  const _id = new mongoose.Types.ObjectId();

  if (req.method == "POST") {
    try {
      const { image } = req.body;
      const option = {
        upload_preset: "datg63",
        public_id: _id,
        overwrite: true,
      };
      const data = await cloudinary.uploader.upload(image, option);
      console.log(data);
      const newDb = new Product({
        _id,
        image: data.secure_url,
      });

      await newDb.save();
      return res.status(201).json({
        message: "Upload success!",
        code: 201,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        code: 500,
      });
    }
  }
};
export default verifytoken(authAdmin(handleImage));
