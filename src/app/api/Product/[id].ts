import { connectToDatabase } from "../../../../lib/db";
import Product from "../../../../models/product";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectToDatabase();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), {
      status: 500,
    });
  }
}
