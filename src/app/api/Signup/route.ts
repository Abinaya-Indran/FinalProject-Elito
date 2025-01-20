// src/app/api/signup/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Signup from "../../../../models/"; // Adjust path to your User model
import { ObjectId } from "mongodb"; // For working with MongoDB IDs

// CREATE: Sign up a new user
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, email, password, role, address, phoneNumber } = body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "Name, email, password, and role are required" }),
        { status: 400 }
      );
    }

    // Check if the role is valid
    if (role !== "Buyer" && role !== "Seller") {
      return new Response(
        JSON.stringify({ error: "Role must be either 'Buyer' or 'Seller'" }),
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 409 }
      );
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // Remember to hash the password in production
      role,
      ...(role === "Seller" && { address, phoneNumber }), // Include additional fields for sellers
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error signing up user:", error);
    return new Response(
      JSON.stringify({ error: "Failed to sign up user", details: error.message }),
      { status: 500 }
    );
  }
}

// READ: Get all users
export async function GET() {
  try {
    await connectToDatabase();

    const users = await User.find();

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users", details: error.message }),
      { status: 500 }
    );
  }
}

// UPDATE: Update user details by ID
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { userId, updates } = body;

    // Validate required fields
    if (!userId || !updates) {
      return new Response(
        JSON.stringify({ error: "User ID and updates are required" }),
        { status: 400 }
      );
    }

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update user", details: error.message }),
      { status: 500 }
    );
  }
}

// DELETE: Remove a user by ID
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { userId } = body;

    // Validate required fields
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { status: 400 }
      );
    }

    // Find and delete user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully", user: deletedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete user", details: error.message }),
      { status: 500 }
    );
  }
}
