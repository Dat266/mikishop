import verifytoken from "../../../middleware/verifytoken";
import authAdmin from "../../../middleware/authAmin";
import connect from "../../../config/db";
import Users from "../../../modules/Users";
async function handlerDelete(req, res) {
  await connect();
  await Users.findByIdAndDelete(req.query.id);
  return res.status(200).json("Xóa user thành công!");
}

export default verifytoken(authAdmin(handlerDelete));
