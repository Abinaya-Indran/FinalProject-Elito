import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  address?: string;
  phoneNumber?: string;
  cakeShopName?: string;
  sellerType?: string;
}

// Define the JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Define the structure of the decoded token
interface DecodedToken {
  userId: string;
  role: string;
}

// Helper function to generate JWT
const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1d" });
};

// Middleware for JWT authentication
const authenticateToken = async (): Promise<DecodedToken | NextResponse> => {
  const token = (await cookies()).get("token")?.value; // Use cookies instead of Authorization header

  if (!token) {
    return NextResponse.json({ error: "Access denied. No token provided." }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Failed to authenticate token:", (error as Error).message);
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }
};

// ✅ GET: Fetch all users (Admin only)
export async function GET() {
  await connectToDatabase(); // Connect to the database

  // Authenticate the token
  const decoded = await authenticateToken();
  if (decoded instanceof NextResponse) {
    return decoded; // Return the error response if authentication fails
  }

  // Check if the user is an admin
  if (decoded.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  }

  try {
    // Fetch all users and exclude the password field
    const users = await User.find().select("-password");
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", (error as Error).message);
    return NextResponse.json({ error: "Failed to fetch users", details: (error as Error).message }, { status: 500 });
  }
}

// ✅ POST: Create a new user (Signup)
export async function POST(req: Request) {
  await connectToDatabase(); // Connect to the database

  const body = await req.json();
  const { name, email, password, role, address, phoneNumber, sellerType, cakeShopName } = body;

  // Validate required fields
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Name, email, password, and role are required" }, { status: 400 });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Validate seller-specific fields
  if (role === "Seller" && (!address || !phoneNumber || !sellerType)) {
    return NextResponse.json({ error: "Seller details are incomplete" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    address: role === "Seller" ? address : undefined,
    phoneNumber: role === "Seller" ? phoneNumber : undefined,
    sellerType: role === "Seller" ? sellerType : undefined,
    cakeShopName: role === "Seller" && sellerType === "Cake Shop" ? cakeShopName : undefined,
  });

  try {
    await newUser.save(); // Save the new user to the database
    const token = generateToken(newUser._id.toString(), newUser.role); // Generate JWT
    return NextResponse.json({ message: "User registered successfully!", token }, { status: 201 });
  } catch (error) {
    console.error("Failed to save user:", (error as Error).message);
    return NextResponse.json({ error: "Failed to register user", details: (error as Error).message }, { status: 500 });
  }
}

// ✅ PATCH: Update user details
export async function PATCH(req: NextRequest) {
  await connectToDatabase(); // Connect to the database

  // Authenticate the token
  const decoded = await authenticateToken();
  if (decoded instanceof NextResponse) {
    return decoded; // Return the error response if authentication fails
  }

  const body = await req.json();
  const { name, email, password, role, address, phoneNumber, sellerType, cakeShopName } = body;

  // Prepare the updated data
  const updatedData: UserUpdate = { name, email };

  // Hash the new password if provided
  if (password) {
    updatedData.password = await bcrypt.hash(password, 10);
  }

  // Update seller-specific fields if the role is "Seller"
  if (role === "Seller") {
    updatedData.address = address;
    updatedData.phoneNumber = phoneNumber;
    updatedData.sellerType = sellerType;

    if (sellerType === "Cake Shop") {
      updatedData.cakeShopName = cakeShopName;
    }
  }

  try {
    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(decoded.userId, updatedData, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Failed to update user:", (error as Error).message);
    return NextResponse.json({ error: "Failed to update user", details: (error as Error).message }, { status: 500 });
  }
}

// ✅ DELETE: Remove a user (Admin or User themselves)
export async function DELETE(req: NextRequest) {
  await connectToDatabase(); // Connect to the database

  // Authenticate the token
  const decoded = await authenticateToken();
  if (decoded instanceof NextResponse) {
    return decoded; // Return the error response if authentication fails
  }

  const body = await req.json();
  const { userId: deleteUserId } = body;

  // Validate the user ID
  if (!deleteUserId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  // Check if the user is authorized to delete
  if (decoded.role !== "Admin" && decoded.userId !== deleteUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(deleteUserId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete user:", (error as Error).message);
    return NextResponse.json({ error: "Failed to delete user", details: (error as Error).message }, { status: 500 });
  }
}