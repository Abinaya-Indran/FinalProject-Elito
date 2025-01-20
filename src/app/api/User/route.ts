import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import User from "../../../../models/User";

// GET: Fetch all users
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch users", details: error.message }),
      { status: 500 }
    );
  }
}

// POST: Create a new user
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Validation
    if (!body.username || !body.email || !body.password) {
      return new Response(
        JSON.stringify({ error: "Username, email, and password are required" }),
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to create user", details: error.message }),
      { status: 500 }
    );
  }
}

// PATCH: Update a user by ID
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { userId, username, email, password } = body;

    // Validate input
    if (!userId || (!username && !email && !password)) {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to update user", details: error.message }),
      { status: 500 }
    );
  }
}

// DELETE: Delete a user by ID
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to delete user", details: error.message }),
      { status: 500 }
    );
  }
}
