import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs"; // Assuming bcryptjs is used for password hashing

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    // Get login data from the request body
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          error: "Email and password are required",
        }),
        { status: 400 }
      );
    }

    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // Return user details (without JWT)
    return NextResponse.json(
      {
        user: { id: user._id, name: user.name, role: user.role },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Authentication failed", details: error.message }),
      { status: 500 }
    );
  }
}
