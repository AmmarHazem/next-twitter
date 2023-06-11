import bcrypt from "bcrypt";
import Prisma from "../../libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { email, username, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await Prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        userName: username,
        name: name,
        hasNotification: false,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log("--- api/register error", e);
    res.status(400).end();
  }
}
