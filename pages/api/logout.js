import verifyToken from "../../middleware/verifytoken";
import connect from "../../config/db";
import Storerefresh from "../../modules/Storerefresh";
const logout = async (req, res) => {
  await connect();
  res.setHeader("Set-Cookie", "refreshToken=delete; path=/");
  await Storerefresh.findOneAndDelete({ userId: req.user._id });
  return res.status(200).json("Logouted success!");
};

export default verifyToken(logout);
