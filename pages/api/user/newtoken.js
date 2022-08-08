import connect from "../../../config/db";
import Storerefresh from "../../../modules/Storerefresh";
import generateAccessToken from "../storeToken/generateAccessToken";

import jwt from "jsonwebtoken";

const handlerRefreshToken = async (req, res) => {
  await connect();
  if (req.method == "POST") {
    const refreshToken = req.cookies.refreshToken;
    const isRefreshToken = await Storerefresh.findOne({
      refreshtoken: refreshToken,
    });
    if (isRefreshToken) {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) return res.status(401).json("Refresh token is not valid");
        const newAccToken = generateAccessToken(user);
        return res.status(200).json({ accessToken: newAccToken });
      });
    } else {
      return res.status(401).json("Request token not found!");
    }
  }
};

export default handlerRefreshToken;
