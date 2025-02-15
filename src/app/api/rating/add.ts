import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Rating from "../../../../models/rating"; // Your Rating model
import { connectToDatabase } from "../../../../lib/db"; // Ensure this exists

// Connect to DB
connectToDatabase();

// GET: Fetch reviews for a specific cake
export async function GET(req: Request) {
  const url = new URL(req.url);
  const cakeId = url.searchParams.get("cakeId");

  if (!cakeId) return NextResponse.json({ error: "cakeId is required" }, { status: 400 });

  try {
    const reviews = await Rating.find({ cakeId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST: Add a new review
export async function POST(req: Request) {
  try {
    const { cakeId, rating, review } = await req.json();
    if (!cakeId || !rating || !review.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newReview = new Rating({ cakeId, rating, review });
    await newReview.save();

    return NextResponse.json(newReview);
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
