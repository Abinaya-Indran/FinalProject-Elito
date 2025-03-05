import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Cake from '../../../../../models/product';
import Order from '../../../../../models/order';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId } = body;

    // if (!userId || !Types.ObjectId.isValid(userId)) {
    //   return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    // }

    await connectToDatabase();

    // Find cakes sold by this seller
    const cakes = await Cake.find({ sellerId: userId })

    if (cakes.length === 0) {
      return NextResponse.json({ error: 'No cakes found for this seller' }, { status: 404 });
    }

    // Extract cake IDs
    const cakeIds = cakes.map(cake => cake._id);

    // Fetch orders that contain any of these cake IDs
    const orders = await Order.find({ cakeId: { $in: cakeIds } });
    
    // Fetch cake images separately
    const cakesWithImages = await Cake.find({ _id: { $in: cakeIds } }).select('_id image name');
    
    // Convert cakesWithImages array into a Map for quick lookup
    const cakeImageMap = new Map(cakesWithImages.map(cake => [cake._id.toString(), { image: cake.image, name: cake.name }]));
    
    // Merge cake images into orders
    const ordersWithImages = orders.map(order => ({
        ...order.toObject(),
        cakeDetails: cakeImageMap.get(order.cakeId.toString()) || null, // Add image if found, otherwise null
    }));   

    return NextResponse.json({
      success: true,
      message: 'Orders retrieved successfully',
      orders: ordersWithImages,
    });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error',
      details: (error as Error).message,
    }, { status: 500 });
  }
};
