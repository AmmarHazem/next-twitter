import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { userID } = req.query;
    if (!userID || typeof userID !== "string") {
      throw new Error("Invalid id");
    }
    const promisesResult = await Promise.all([
      Prisma.notification.findMany({ where: { userID: userID }, orderBy: { createdAt: "desc" } }),
      Prisma.user.update({
        where: { id: userID },
        data: {
          hasNotification: false,
        },
      }),
    ]);
    const notifications = promisesResult[0];
    return res.status(200).json(notifications);
  } catch (error) {
    console.log("--- /api/notificaiton/[userID] error", error);
    return res.status(400).end();
  }
}
