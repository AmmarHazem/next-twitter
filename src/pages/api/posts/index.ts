import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../libs/serverAuth";
import Prisma from "../../../libs/prismadb";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "GET") return res.status(405).end();
  try {
    if (req.method === "POST") {
      return createPost(req, res);
    }
    return getPosts(req, res);
  } catch (error) {
    console.log("--- api/posts error", error);
    return res.status(400).end();
  }
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await serverAuth(req, res);
  const { body } = req.body;
  const post = await Prisma.post.create({
    data: {
      body: body,
      userID: currentUser.id,
    },
  });
  return res.status(200).json(post);
}

export async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  const posts = await Prisma.post.findMany({ include: { user: true, comments: true }, orderBy: { createdAt: "desc" } });
  return res.status(200).json(posts);
}
