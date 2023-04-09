import db from "@/src/services/db";
import { generateOTP, validate } from "@/src/services/otp";
import User from "@/src/services/db/models/User";
import { set as setOTP } from "@/src/services/otp";
import sendMail from "@/src/services/mail";
import { userOTPVerification } from "@/src/services/mail/templates";

export default db(async function (req, res) {
  if (req.method !== "POST") return res.status(405).send("method not allowed");
  const { email } = req.body;
  try {
    const getUser = User.findOne({ email });
    if (!getUser) throw new Error("user does not exists");
    if (getUser.verified) return res.status(200).json("already verified");
    const otp = generateOTP();
    const initiateOTP = await setOTP(email, otp);
    if (initiateOTP) {
      await sendMail(
        userOTPVerification({ email, otp, to_name: getUser.name })
      );
      res.status(200).json(`an otp has been sent to ${email}`);
    }
  } catch (error) {
    console.log(error);
    res.status(200).json(error.message);
  }
});
