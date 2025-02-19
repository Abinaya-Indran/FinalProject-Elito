import { NextResponse } from "next/server";
import Payment from "../../../../models/Payment"; // Import your Payment model

// API route to get all payment records
export async function GET() {
  try {
    // Fetch all payment records from the database
    const payments = await Payment.find({}).sort({ createdAt: -1 }); // Sort by most recent first

    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
