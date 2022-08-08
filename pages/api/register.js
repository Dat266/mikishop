import { hash } from "bcrypt";
import connect from "../../config/db";
import Users from "../../modules/Users";
export default async function register(req, res) {
  await connect();
  if (req.method == "POST") {
    hash(req.body.password, 10, async function (err, hash) {
      const newUser = new Users({
        fullname: req.body.fullname,
        email: req.body.email,
        age: req.body.age,
        password: hash,
        confirmpassword: hash,
      });
      const saveUser = await newUser.save();
      return res.status(201).json({
        message: "Register success!",
        code: 201,
      });
    });
  }
}
