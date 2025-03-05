import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db'; 
import Cart from '../../../../models/addtocart';  

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { userId, productId, quantity } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check if the product is already in the cart
    const existingCartItem = await Cart.findOne({ userId, productId });
    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;
      await existingCartItem.save();
      return NextResponse.json({ message: "Updated cart quantity", product: existingCartItem }, { status: 200 });
    }

    // If not, add a new item
    const newCartItem = new Cart({ userId, productId, quantity });
    await newCartItem.save();  

    return NextResponse.json({ message: "Added to cart successfully", product: newCartItem }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
