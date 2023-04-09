// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "@/src/services/db";
import bcrypt from "bcrypt";
import withSessionApi from "@/src/middleware/withSessionApi";
import User from "@/src/services/db/models/User";

export default withSessionApi(
  db(async function (req, res) {
    try {
      const user = await User.findById(req.user);
      if (!user) throw new Error("user does not exists");
      const verifyPassword = await bcrypt.compareSync(
        req.body.current_password,
        user.password
      );
      if (!verifyPassword) throw new Error("wrong password");
      const isSamePassword = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (isSamePassword)
        throw new Error("new password cannot be same as current password");
      const updateUser = await User.findByIdAndUpdate(req.user, {
        password: req.body.password,
      });
      return res.status(201).json(updateUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(400).json(error);
    }
  })
);
