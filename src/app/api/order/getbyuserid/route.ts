import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Cake from '../../../../../models/product';
import Order from '../../../../../models/order';
import { Types } from 'mongoose'; // Import Types from mongoose

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId } = body;

    // if (!userId || !Types.ObjectId.isValid(userId)) {
    //   return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    // }

    await connectToDatabase();

    // Convert userId to ObjectId
    const sellerObjectId = new Types.ObjectId(userId);

    // Find cakes sold by this seller
    const cakes = await Cake.find({ sellerId: sellerObjectId });

    if (cakes.length === 0) {
      return NextResponse.json({ error: 'No cakes found for this seller' }, { status: 404 });
    }

    // Extract cake IDs
    const cakeIds = cakes.map(cake => cake._id);

    // Find orders that contain any of these cake IDs
    const orders = await Order.find({ cakeId: { $in: cakeIds } });

    return NextResponse.json({
      success: true,
      message: 'Orders retrieved successfully',
      orders,
    });
  } catch (error: any) {
    console.error('Error retrieving orders:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error',
      details: error.message,
    }, { status: 500 });
  }
};
