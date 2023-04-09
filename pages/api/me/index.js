// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSessionApi from "@/src/middleware/withSessionApi";
import db from "@/src/services/db";
import Follower from "@/src/services/db/models/Follower";
import Profile from "@/src/services/db/models/Profile";

const getProfile = withSessionApi(async (req, res) => {
  try {
    const getProfileInstance = await Profile.findOne({ user: req.user });
    const getFollowerCount = await Follower.countDocuments({ following: req.user });
    const getFollowingCount = await Follower.countDocuments({ follower: req.user });
    const response = {
      ...getProfileInstance._doc,
      follower:getFollowerCount,
      following:getFollowingCount
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json(error);
  }
});

const updateProfile = withSessionApi(async (req, res) => {
  try {
    const updateProfileInstance = await Profile.findOneAndUpdate(
      { user: req.user },
      req.body
    );
    return res.status(200).json(updateProfileInstance);
  } catch (error) {
    return res.status(404).json(error);
  }
});

export default db(async function (req, res) {
  if (req.method === "GET") {
    return getProfile(req, res);
  } else if (req.method === "PUT") {
    return updateProfile(req, res);
  }
  return res.status(405).json("method not allowed");
});
