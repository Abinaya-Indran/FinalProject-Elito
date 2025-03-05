import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import Cake from '../../../../../models/product';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { cakeId } = body;

    await connectToDatabase();

    const cake = await Cake.findById({_id: cakeId});

    if (!cake) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account retrieved successfully',
      cake,
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