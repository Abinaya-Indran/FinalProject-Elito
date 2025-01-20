import { NextRequest, NextResponse } from "next/server";
import Payment from "../../../../models/Payment";
import { connectToDatabase } from "../../../../lib/db";

// Add a Payment (POST)
export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { paymentId, userId, orderId, amount, paymentMethod, status } =
    await req.json();

  try {
    const newPayment = await Payment.create({
      paymentId,
      userId,
      orderId,
      amount,
      paymentMethod,
      status,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Payment added successfully", payment: newPayment },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error adding payment", error: error.message },
      { status: 500 }
    );
  }
}

// Get All Payments (GET)
export async function GET() {
  await connectToDatabase();

  try {
    const payments = await Payment.find();
    return NextResponse.json(payments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching payments", error: error.message },
      { status: 500 }
    );
  }
}

// PATCH: Update a Payment
export async function PATCH(req: NextRequest) {
  await connectToDatabase(); // Ensure the DB connection

  const { id } = req.nextUrl.searchParams; // Get the payment ID from query parameters
  const updates = await req.json(); // Get the updates from the body

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPayment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Payment updated successfully", payment: updatedPayment },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Error updating payment", error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a Payment
export async function DELETE(req: NextRequest) {
  await connectToDatabase(); // Ensure the DB connection

  const { id } = req.nextUrl.searchParams; // Get the payment ID from query parameters

  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);
    if (!deletedPayment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payment deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error deleting payment", error: error.message }, { status: 500 });
  }
}

