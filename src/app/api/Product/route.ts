import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Product from "../../../../models/product";

// GET: Fetch all products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

// POST: Add a new product
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, price, description, category, stock, imageUrl } = body;

    if (!name || !price || !imageUrl) {
      return new Response(
        JSON.stringify({ error: "Name, price, and imageUrl are required" }),
        { status: 400 }
      );
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to add product", details: error.message }),
      { status: 500 },
    );
  }
}
