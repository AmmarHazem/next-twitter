import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { postID } = req.query;
    if (!postID || typeof postID !== "string") {
      throw new Error("Invalid post id");
    }
    const post = await Prisma.post.findUnique({
      where: { id: postID },
      include: { user: true, comments: { include: { user: true }, orderBy: { createdAt: "desc" } } },
    });
    return res.status(200).json(post);
  } catch (error) {
    console.log("--- api/[postID] error", error);
    return res.status(400).end();
  }
}
