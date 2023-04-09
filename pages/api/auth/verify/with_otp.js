import cache from "@/src/services/cache";
import db from "@/src/services/db";
import User from "@/src/services/db/models/User";
import { validate as validateOTP } from "@/src/services/otp";

export default db(async function (req, res) {
  if (req.method !== "POST") return res.status(405).send("method not allowed");
  const { email, otp } = req.body;
  try {
    const getUser = await User.findOne({ email });
    console.log(getUser);
    if (!getUser) throw new Error("user does not exists");
    const validate = await validateOTP(email, otp);
    const updateUser = await User.findOneAndUpdate(
      { email },
      { verified: true }
    );
    const getUserUpdated = await User.findOne({ email });
    return res.status(200).json(getUserUpdated);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
  }
});
