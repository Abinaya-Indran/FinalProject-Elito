// /app/api/Order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db'; // Ensure the correct path to your DB connection

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const data = await req.json();

    // Establish a database connection
    const mongoose = await connectToDatabase();
    
    // Check if the database connection is established
    if (!mongoose.connection.readyState) {
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }

    // Insert order data into MongoDB (adjust collection name if needed)
    const result = await mongoose.connection.collection('orders').insertOne(data);

    // Check if the insertion was successful
    if (result.insertedId) {
      return NextResponse.json(
        { message: 'Order placed successfully!', orderId: result.insertedId },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to insert the order into the database' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
