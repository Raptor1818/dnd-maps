import { db } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const map = await db.map.findUnique({
    where: { id: Number(id) },
  });

  if (!map || !map.image_url) {
    res.status(404).send("Not found");
    return;
  }

  res.setHeader("Content-Type", "image/webp");
  res.send(map.image_url);
}
