import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { userName } = req.query;
    if (!userName || typeof userName !== "string") {
      throw new Error("Invalid user name");
    }
    const user = await Prisma.user.findUnique({ where: { userName: userName } });
    if (!user) {
      throw new Error("Invalid user name");
    }
    const followersCount = await Prisma.user.count({ where: { followingIDs: { has: user.id } } });
    return res.status(200).json({
      user: user,
      followersCount: followersCount,
    });
  } catch (error) {
    console.log("--- handler error", error);
    res.status(400).end();
  }
}
