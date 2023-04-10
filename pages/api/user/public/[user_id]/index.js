// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSessionApi from "@/src/middleware/withSessionApi";
import db from "@/src/services/db";
import Follower from "@/src/services/db/models/Follower";
import Profile from "@/src/services/db/models/Profile";
import User from "@/src/services/db/models/User";

export default db(async function handler(req, res) {
  if (!req.query?.user_id) return res.status(404).json("not found");
  const id = req.query.user_id;
  try {
    const user = await User.findById(id, { password: 0 });
    const profile = await Profile.findOne({ user: id });
    const followers = await Follower.find({ following: id }).populate(
      "follower",
      { password: 0 }
    );
    const following = await Follower.find({ follower: id }).populate(
      "following",
      { password: 0 }
    );
    const response = {
      ...user._doc,
      profile,
      followers,
      following,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});
