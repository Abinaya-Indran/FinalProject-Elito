// src/app/api/product/[id]/route.ts
import { connectToDatabase } from '../../../../../lib/db';
import Product from '../../../../../models/product';
import { NextResponse } from 'next/server';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params || {}; // Adding fallback in case params is undefined

  if (!id) {
    return NextResponse.json({ error: 'Product ID is missing' }, { status: 400 });
  }

  try {
    console.log('Connecting to the database...');
    await connectToDatabase();
    console.log('Database connected successfully!');
    
    const product = await Product.findById(id); // Fetch product by ID from DB

    if (!product) {
      console.log('Product not found!');
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 }); // Return product details
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
