import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import User from '../../../../../models/user';
import { Types } from 'mongoose';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Valid account ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json({
      success: false,
      error: 'Server error',
      details: (error as Error).message,
    }, { status: 500 });
  }
};