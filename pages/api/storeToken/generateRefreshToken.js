import connect from "../../../config/db";
import jwt from "jsonwebtoken";
const REFRESH_KEY = process.env.JWT_REFRESH_KEY;
connect();
//generateRefreshToken
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      admin: user.admin,
    },
    REFRESH_KEY,
    {
      expiresIn: "365d",
    }
  );
};

export default generateRefreshToken;
