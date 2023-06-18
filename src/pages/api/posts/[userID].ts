import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userID } = req.query;
    if (!userID || typeof userID !== "string") {
      return res.status(400).end();
    }
    const posts = await Prisma.post.findMany({
      where: { userID: userID },
      include: { user: true, comments: true },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log("--- api/posts/[userID] error", error);
    return res.status(400).end();
  }
}
