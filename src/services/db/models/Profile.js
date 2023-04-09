import mongoose, { model, Schema } from "mongoose";

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "CProAuthUser",
    },
    about: {
      type: Schema.Types.String,
      default: null,
    },
    instagram: {
      type: Schema.Types.String,
      default: null,
    },
    linkedin: {
      type: Schema.Types.String,
      default: null,
    },
    facebook: {
      type: Schema.Types.String,
      default: null,
    },
    github: {
      type: Schema.Types.String,
      default: null,
    },
    website: {
      type: Schema.Types.String,
      default: null,
    },
    twitter: {
      type: Schema.Types.String,
      default: null,
    },
    highest_education: {
      type: Schema.Types.String,
      default: null,
    },
    occupation: {
      type: Schema.Types.String,
      default: null,
    },
    interests: [{ type: Schema.Types.String, default: null }],
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.CProUserProfile || model("CProUserProfile", ProfileSchema);

export default Profile;
