import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/db"; // Your database connection file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { productId, name, price, size, sellerId } = req.body;

  try {
    const db = await connectToDatabase();
    await db.collection("sellerOrders").insertOne({
      productId,
      name,
      price,
      size,
      sellerId,
      createdAt: new Date(),
    });

    res.status(200).json({ message: "Details sent to seller" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send details" });
  }
}
