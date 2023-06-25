import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../libs/serverAuth";
import Prisma from "../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "DELETE") return res.status(405).end();
  try {
    const { postID } = req.body;
    if (!postID || typeof postID !== "string") {
      throw new Error("Invalid post ID");
    }
    const currentUser = await serverAuth(req, res);
    const post = await Prisma.post.findUnique({ where: { id: postID } });
    if (!post) {
      throw new Error("Invalid post ID");
    }
    let updatedLikedIDs = [...(post.likedIDs ?? [])];
    if (req.method === "POST") {
      updatedLikedIDs.push(currentUser.id);
    } else {
      updatedLikedIDs = updatedLikedIDs.filter((id) => id !== currentUser.id);
    }
    const updatedPost = await Prisma.post.update({ where: { id: postID }, data: { likedIDs: updatedLikedIDs } });
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log("--- api/like error", error);
    res.status(400).end();
  }
}
