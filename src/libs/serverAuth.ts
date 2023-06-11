import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Prisma from "./prismadb";

async function serverAuth(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  const currentUser = await Prisma.user.findUnique({ where: { email: session.user.email } });
  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return currentUser;
}

export default serverAuth;
