import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Cake from '../../../../../models/product';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId } = body;

    // if (!cakeId || !Types.ObjectId.isValid(cakeId)) {
    //   return NextResponse.json({ error: 'Valid account ID is required' }, { status: 400 });
    // }

    await connectToDatabase();

    const cakes = await Cake.find({ sellerId: userId });

    if (!cakes) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account retrieved successfully',
      cakes,
    });
  } catch (error) {
    console.error('Error retrieving cakes:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error',
      details: (error as Error).message,
    }, { status: 500 });
  }
};