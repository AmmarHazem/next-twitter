import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../libs/serverAuth";
import Prisma from "../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "DELETE") return res.status(404).end();
  try {
    const { userName } = req.body;
    if (!userName || typeof userName !== "string") {
      throw new Error("Invalid user ID 1");
    }
    const currentUser = await serverAuth(req, res);
    const userToFollow = await Prisma.user.findUnique({ where: { userName: userName } });
    if (!userToFollow) {
      throw new Error("Invalid user ID 2");
    }
    let updatedFollowingIDs = [...(currentUser.followingIDs ?? [])];
    if (req.method === "POST") {
      updatedFollowingIDs.push(userToFollow.id);
    } else {
      updatedFollowingIDs = updatedFollowingIDs.filter((id) => id !== userToFollow.id);
    }
    const updatedCurrentUser = await Prisma.user.update({
      where: { id: currentUser.id },
      data: { followingIDs: Array.from(new Set(updatedFollowingIDs)) },
    });
    return res.status(200).json(updatedCurrentUser);
  } catch (error) {
    console.log("--- api/follow error", error);
    return res.status(400).end();
  }
}

async function follow(req: NextApiRequest, res: NextApiResponse) {}
