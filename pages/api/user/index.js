// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "@/src/services/db";
import Follower from "@/src/services/db/models/Follower";
import Profile from "@/src/services/db/models/Profile";
import User from "@/src/services/db/models/User";

export default db(async function handler(req, res) {
  try {
    const profile = await Profile.find({}).populate("user", { password: 0 });
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(400).json(error);
  }
});
