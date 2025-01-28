// src/app/api/product/route.ts
import { connectToDatabase } from '../../../../lib/db';
import Product from '../../../../models/product'; // Adjust based on your actual directory structure
import { NextResponse } from 'next/server'; // Import the correct NextResponse for App Directory
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}
// Named GET export for the App Directory structure
export async function GET() {
  try {
    console.log('Connecting to the database...');
    await  connectToDatabase(); // Connect to DB
    console.log('Database connected successfully!');
    const products: Product[] = await Product.find({}); // Fetch products from DB
    // console.log('Products fetched:', products);
    if (products.length === 0) {
      console.log('No products found!');
      return NextResponse.json({ error: 'No products found' }, { status: 404 });
    }
    return NextResponse.json(products, { status: 200 }); // Return fetched products with status 200
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}