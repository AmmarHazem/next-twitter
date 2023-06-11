import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../libs/serverAuth";
import Prisma from "../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return res.status(405).end();
  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) {
      return res.status(403).end();
    }
    const { name, userName, bio, profileImage, coverImage } = req.body;
    const updatedUser = await Prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: name ?? currentUser.name,
        userName: userName ?? currentUser.userName,
        profileImage: profileImage ?? currentUser.profileImage,
        coverImage: coverImage ?? currentUser.coverImage,
        bio: bio ?? currentUser.bio,
      },
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    console.log("--- api/edit error", e);
    res.status(400).end();
  }
}
