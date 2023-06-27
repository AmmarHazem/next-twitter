import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../libs/serverAuth";
import Prisma from "../../libs/prismadb";
import { createUserPostNotification } from "./like";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const currentUser = await serverAuth(req, res);
    const commentBody = req.body.body;
    const { postID } = req.query;
    if (!postID || typeof postID !== "string") {
      throw new Error("Invalid post ID");
    }
    const promisesResult = await Promise.all([
      createUserPostNotification({ notificationText: "Someone commented on your tweet", postID: postID }),
      Prisma.comment.create({
        data: {
          body: commentBody,
          userID: currentUser.id,
          postID: postID,
        },
      }),
    ]);
    const comment = promisesResult[1];
    return res.status(200).json(comment);
  } catch (error) {
    console.log("--- api/comments error", error);
    return res.status(400).end();
  }
}
