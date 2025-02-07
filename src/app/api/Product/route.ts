import { connectToDatabase } from '../../../../lib/db';
import Product from '../../../../models/product';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    console.log('Connecting to the database...');
    await connectToDatabase();
    console.log('Database connected successfully!');

    // Get query params
    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get("sellerId"); // Extract sellerId from query params

    let products;

    if (sellerId) {
      console.log(`Fetching products for sellerId: ${sellerId}`);
      products = await Product.find({ sellerId }).lean(); // Filter products by sellerId
    } else {
      console.log('Fetching all products...');
      products = await Product.find({}).lean(); // Fetch all products
    }

    if (!products.length) {
      console.log('No products found!');
      return NextResponse.json({ error: 'No products found' }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
