import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/db";
import Rating from "../../../../models/rating";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectToDatabase();

  try {
    const { cakeId } = req.query;
    const reviews = await Rating.find({ cakeId }).sort({ createdAt: -1 });

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
}
