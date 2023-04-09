import mongoose, { model, Schema } from "mongoose";

const FollowerSchema = new Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "CProAuthUser" },
  following: { type: mongoose.Schema.Types.ObjectId, ref: "CProAuthUser" },
});

// Create the follower model
const Follower =
  mongoose.models.CProFollower ||
  mongoose.model("CProFollower", FollowerSchema);

export default Follower;
