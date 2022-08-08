import connect from "../../../config/db";
import jwt from "jsonwebtoken";
const ACC_KEY = process.env.JWT_ACC_KEY;
connect();
//generateAccessToken
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      admin: user.admin,
    },
    ACC_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export default generateAccessToken;
