import { NextApiRequest, NextApiResponse } from "next";
import {connectToDatabase }from "../../../../lib/db"; 
import Cart from "../../../../models/addtocart"; 
import Product from "../../../../models/product"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();
      
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || quantity <= 0) {
        return res.status(400).json({ message: "Invalid input" });
      }

      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if the item already exists in the cart
      let cartItem = await Cart.findOne({ userId, productId });

      if (cartItem) {
        // If exists, increase the quantity
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        // Add new item to cart
        cartItem = new Cart({ userId, productId, quantity });
        await cartItem.save();
      }

      return res.status(200).json({ message: "Product added to cart", product: cartItem });
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
