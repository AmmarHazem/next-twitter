import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { userID } = req.query;
    if (!userID || typeof userID !== "string") {
      throw new Error("Invalid user id");
    }
    const user = await Prisma.user.findUnique({ where: { id: userID } });
    const followersCount = await Prisma.user.count({ where: { followingIDs: { has: userID } } });
    return res.status(200).json({
      user: user,
      followersCount: followersCount,
    });
  } catch (error) {
    console.log("--- api/user/userID error", error);
    res.status(400).end();
  }
}
