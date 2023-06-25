import { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "../index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return getPosts(req, res);
}
