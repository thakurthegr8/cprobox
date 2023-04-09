// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSessionApi from "@/src/middleware/withSessionApi";
import db from "@/src/services/db";
import Follower from "@/src/services/db/models/Follower";
import Profile from "@/src/services/db/models/Profile";

const getFollower = withSessionApi(async (req, res) => {
  try {
    const getFollowerInstance = await Follower.find({
      following: req.user,
    }).populate("follower");
    return res.status(200).json(getFollowerInstance);
  } catch (error) {
    return res.status(404).json(error);
  }
});

const addFollowing = withSessionApi(async (req, res) => {
  console.log(req.user, req.body.following);
  try {
    const addFollowerInstance = await Follower.create({
      following: req.body.following,
      follower: req.user,
    });
    return res.status(200).json(addFollowerInstance);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
const removeFollowing = withSessionApi(async (req, res) => {
  try {
    const removeFollowerInstance = await Follower.deleteOne({
      following: req.body.following,
      follower: req.user,
    });
    return res.status(200).json(removeFollowerInstance);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default db(async function (req, res) {
  if (req.method === "GET") {
    return getFollower(req, res);
  } else if (req.method === "POST") {
    return addFollowing(req, res);
  } else if (req.method === "PUT") {
    return removeFollowing(req, res);
  }
  return res.status(405).json("method not allowed");
});
