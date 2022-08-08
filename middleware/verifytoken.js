import jwt from "jsonwebtoken";
const ACC_KEY = process.env.JWT_ACC_KEY;
export default function verifytoken(handler) {
  return (req, res) => {
    const token = req.headers?.authorization;
    const accToken = token?.split(" ")?.[1];

    if (accToken) {
      jwt.verify(accToken, ACC_KEY, async (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;

        return handler(req, res);
      });
    } else {
      return res.status(403).json("You're not authenticated");
    }
  };
}
