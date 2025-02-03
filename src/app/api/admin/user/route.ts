import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    let users;
    if (role) {
      users = await User.find({ role });
    } else {
      users = await User.find();
    }

    // If you want to include JWT in the response, you can generate a token for the first user or based on some condition
    const token = generateToken(users[0]?._id); // Example: using the first user's ID

    return NextResponse.json(
      { data: users, token }, // Include the token if needed
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching users:", error); // Log error for debugging purposes
    return new Response(
      JSON.stringify({
        error: "Failed to fetch users",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
