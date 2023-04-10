import withSessionApi from "@/src/middleware/withSessionApi";
import db from "@/src/services/db";
import User from "@/src/services/db/models/User";
import jwt from "jsonwebtoken"
import moment from "moment";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const updateProfileImage = withSessionApi(
  db(async (req, res) => {
    const { image } = req.body;
    try {
      const update = await User.findByIdAndUpdate(req.user, { image });
      const token = jwt.sign({ data: update }, process.env.JWT_SECRET);
      res.setHeader(
        "Set-Cookie",
        `access_token=${token}; HttpOnly; path=/; Expires=${moment().add(
          1,
          "day"
        )}`
      );
      return res.status(201).json(update);
    } catch (error) {
      return res.status(400).json(error);
    }
  })
);

export default function handler(req, res) {
  updateProfileImage(req, res);
}
