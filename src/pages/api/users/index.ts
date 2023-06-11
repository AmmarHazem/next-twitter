import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const users = await Prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json(users);
  } catch (e) {
    console.log("--- api/users error", e);
    res.status(400).end();
  }
}
