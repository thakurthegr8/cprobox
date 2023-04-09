import db from "@/src/services/db";
import Profile from "@/src/services/db/models/Profile";
import User from "@/src/services/db/models/User";
import sendMail from "@/src/services/mail";
import { userOTPVerification } from "@/src/services/mail/templates";
import { generateOTP, set as setOTP } from "@/src/services/otp";

export default db(async function (req, res) {
  if (req.method !== "POST") return res.status(405).send("method not allowed");
  const { email, name, password } = req.body;
  try {
    const createUser = await User.create({ email, name, password });
    if (createUser) {
      const createProfile = await Profile.create({ user: createUser._id });
      // const otp = generateOTP();
      // const initiateOTP = await setOTP(email, otp);
      // if (initiateOTP) {
      //   await sendMail(userOTPVerification({ to_name: name, otp, email }));
      //   return res.status(201).json(createUser);
      // }
      if (createProfile) res.status(201).json(createUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
