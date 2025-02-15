import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/db"; // Ensure this file connects to MongoDB
import Cart from "../../../../models/addtocart"; // Create this model
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const token = await getToken({ req });
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const { productId, quantity, userId } = req.body;

      if (!productId || !userId || !quantity) {
        return res.status(400).json({ message: "Missing product ID or user ID" });
      }

      const existingCartItem = await Cart.findOne({ userId, productId });

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
        return res.status(200).json({ message: "Existing cart item updated.", cartItem: existingCartItem });
      }

      const newCartItem = new Cart({
        userId,
        productId,
        quantity
      });

      await newCartItem.save();

      res.status(201).json({ message: "Product added to cart", cartItem: newCartItem });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "GET") {
    try {
      const token = await getToken({ req });
      if (!token) return res.status(401).json({ message: "Unauthorized" });

      const userId = token.id;
      const cartItems = await Cart.find({ userId });

      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
