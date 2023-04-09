import cache from "@/src/services/cache";
import db from "@/src/services/db";
import User from "@/src/services/db/models/User";
import jwt from "jsonwebtoken";
import { validate as validateOTP } from "@/src/services/otp";
import moment from "moment/moment";

export default db(async function (req, res) {
  if (req.method !== "POST") return res.status(405).send("method not allowed");
  const { email, otp } = req.body;
  try {
    const getUser = await User.findOne({ email });
    console.log(getUser);
    if (!getUser) throw new Error("user does not exists");
    if (!getUser.verified) throw new Error("user is not verified");
    const validate = await validateOTP(email, otp);
    if (validate) {
      const token = jwt.sign({ data: getUser }, process.env.JWT_SECRET);
      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; HttpOnly; path=/; Expires=${moment().add(1,"day")}`
      );
      return res.status(200).json(getUser);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    return res.status(400).json(error);
  }
});
