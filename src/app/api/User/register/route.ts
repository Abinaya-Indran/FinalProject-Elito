import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/user";

// GET: Fetch all users
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find(); // Fetch all users
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
    const { name, email, password, role, address, phoneNumber } = body;
    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({
          error: "Name, email, password, and role are required",
        }),
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      role,
      address: role === "Seller" ? address : undefined, // Only save address for Sellers
      phoneNumber: role === "Seller" ? phoneNumber : undefined, // Only save phoneNumber for Sellers
    });

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
    const { userId, name, email, password, role, address, phoneNumber } = body;

    // Validate input
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { status: 400 }
      );
    }

    const updatedData: any = { name, email, password, role };
    if (role === "Seller") {
      updatedData.address = address;
      updatedData.phoneNumber = phoneNumber;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

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
