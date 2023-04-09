// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Follower from "@/src/services/db/models/Follower";

const getFollowing = withSessionApi(async (req, res) => {
  try {
    const getFollowingInstance = await Follower.find({
      follower: req.user,
    }).populate("following");
    return res.status(200).json(getFollowingInstance);
  } catch (error) {
    return res.status(404).json(error);
  }
});

export default db(async (req, res) => {
  return getFollowing(req, res);
});
