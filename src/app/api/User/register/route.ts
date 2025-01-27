import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use environment variables for the secret key

// Helper function to generate a JWT token
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

// Middleware to protect routes with JWT authentication
const authenticateToken = async (req: Request) => {
  const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token from the 'Authorization' header

  if (!token) {
    throw new Error("Access denied. No token provided.");
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.userId; // Return userId from the decoded token
  } catch (error) {
    throw new Error("Invalid token.");
  }
};

// GET: Fetch all users (protected by JWT)
export async function GET(req: Request) {
  try {
    const userId = await authenticateToken(req); // Authenticate user
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

// POST: Create a new user (you can return a token on successful signup)
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

    // Generate a JWT token upon successful user creation
    const token = generateToken(newUser._id.toString());

    return NextResponse.json({ newUser, token }, { status: 201 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to create user", details: error.message }),
      { status: 500 }
    );
  }
}

// PATCH: Update a user by ID (protected by JWT)
export async function PATCH(req: Request) {
  try {
    const userId = await authenticateToken(req); // Authenticate user
    await connectToDatabase();
    const body = await req.json();
    const { name, email, password, role, address, phoneNumber } = body;

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

// DELETE: Delete a user by ID (protected by JWT)
export async function DELETE(req: Request) {
  try {
    const userId = await authenticateToken(req); // Authenticate user
    await connectToDatabase();
    const body = await req.json();
    const { userId: deleteUserId } = body;

    if (!deleteUserId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(deleteUserId);

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
