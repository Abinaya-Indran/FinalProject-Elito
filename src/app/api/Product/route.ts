import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Product from "../../../../models/product";
import cloudinary from "../../../../lib/cloudinary";

// POST: Add a new product
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, price, description, category, stock, image } = body;

    if (!name || !price || !image) {
      return new Response(
        JSON.stringify({ error: "Name, price, and image are required" }),
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "cake_images", // Cloudinary folder
    });

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      imageUrl: uploadResponse.secure_url,
      imagePublicId: uploadResponse.public_id,
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to add product", details: error.message }),
      { status: 500 }
    );
  }
}

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
