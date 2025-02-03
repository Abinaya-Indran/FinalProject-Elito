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

export async function GET(
  req: Request,
  context: { params: { id: string } } // Use `context` instead of destructuring `params` directly
) {
  const {id} = context.params; // Correct way to access params in App Router

  if (!id) {
    return NextResponse.json({ error: 'Product ID is missing' }, { status: 400 });
  }

  try {
    console.log('Connecting to the database...');
    await connectToDatabase();
    console.log('Database connected successfully!');
    
    const product = await Product.findById(id);

    if (!product) {
      console.log('Product not found!');
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
