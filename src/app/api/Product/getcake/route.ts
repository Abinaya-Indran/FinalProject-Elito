import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Cake from '../../../../../models/product';
import { Types } from 'mongoose';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { cakeId } = body;

    // if (!cakeId || !Types.ObjectId.isValid(cakeId)) {
    //   return NextResponse.json({ error: 'Valid account ID is required' }, { status: 400 });
    // }

    await connectToDatabase();

    const cake = await Cake.findById(cakeId);

    if (!cake) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account retrieved successfully',
      cake,
    });
  } catch (error: any) {
    console.error('Error retrieving cake:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error',
      details: error.message,
    }, { status: 500 });
  }
};