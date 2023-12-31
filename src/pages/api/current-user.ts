import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const currentUser = await serverAuth(req, res);
    res.status(200).json(currentUser);
  } catch (e) {
    console.log("---- handler error", e);
    res.status(400).end();
  }
}
