import jwt from "jsonwebtoken";
import { getCookies } from "@/src/utils/cookies";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send("method not allowed");
  try {
    const access_token = getCookies(req.headers.cookie, "access_token");
    if (access_token) {
      const tokenPayload = jwt.verify(access_token, process.env.JWT_SECRET);
      if (!tokenPayload?.data) throw new Error("invalid token");
      return res.status(200).json(tokenPayload.data);
    }
    return res.status(400).json(null);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    return res.status(400).json(error);
  }
}
