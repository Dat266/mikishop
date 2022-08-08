// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "../../config/db";
import Users from "../../modules/Users";
import bcrypt from "bcrypt";
import generateRefreshToken from "./storeToken/generateRefreshToken";
import generateAccessToken from "./storeToken/generateAccessToken";
import { serialize } from "cookie";
import Storerefresh from "../../modules/Storerefresh";

export default async function login(req, res) {
  await connect();

  if (req.method == "POST") {
    try {
      //login
      const user = await Users.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "Not found email..." });
      }
      const validateUser = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validateUser) {
        return res.status(404).json({ message: "Wrong password" });
      }
      if (user && validateUser) {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        const saveDb = new Storerefresh({
          userId: user._id,
          refreshtoken: refreshToken,
        });
        await saveDb.save();

        res.setHeader(
          "Set-Cookie",
          serialize("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "Strict",
            path: "/",
            Secure: false,
          })
        );

        return res.status(200).json({ user, accessToken });
      }
    } catch (error) {
      res.status(403).json("Login not success!");
    }
  }
}
