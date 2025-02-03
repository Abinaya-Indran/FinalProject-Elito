import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Helper function to generate JWT
const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1d" });
};

// Middleware for JWT authentication
const authenticateToken = async (req: Request) => {
  const token = (await cookies()).get("token")?.value; // Use cookies instead of Authorization header

  if (!token) {
    return NextResponse.json({ error: "Access denied. No token provided." }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }
};

// ✅ GET: Fetch all users (Admin only)
export async function GET(req: Request) {
  await connectToDatabase();
  
  const decoded = await authenticateToken(req);
  if (!decoded || decoded.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  }

  try {
    const users = await User.find().select("-password"); // Exclude password field
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch users", details: error.message }, { status: 500 });
  }
}

// ✅ POST: Create a new user (Signup)
export async function POST(req: Request) {
  await connectToDatabase();
  
  const body = await req.json();
  const { name, email, password, role, address, phoneNumber, sellerType, cakeShopName } = body;

  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Name, email, password, and role are required" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  if (role === "Seller" && (!address || !phoneNumber || !sellerType)) {
    return NextResponse.json({ error: "Seller details are incomplete" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

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

  await newUser.save();

  const token = generateToken(newUser._id.toString(), newUser.role);

  return NextResponse.json({ message: "User registered successfully!", token }, { status: 201 });
}

// ✅ PATCH: Update user details
export async function PATCH(req: Request) {
  await connectToDatabase();

  const decoded = await authenticateToken(req);
  if (!decoded) return decoded; // Returns error response from `authenticateToken`

  const body = await req.json();
  const { name, email, password, role, address, phoneNumber, sellerType, cakeShopName } = body;

  const updatedData: any = { name, email };

  if (password) {
    updatedData.password = await bcrypt.hash(password, 10); // Hash new password
  }

  if (role === "Seller") {
    updatedData.address = address;
    updatedData.phoneNumber = phoneNumber;
    updatedData.sellerType = sellerType;

    if (sellerType === "Cake Shop") {
      updatedData.cakeShopName = cakeShopName;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(decoded.userId, updatedData, { new: true });

  if (!updatedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "User updated successfully", updatedUser }, { status: 200 });
}

// ✅ DELETE: Remove a user (Admin or User themselves)
export async function DELETE(req: Request) {
  await connectToDatabase();

  const decoded = await authenticateToken(req);
  if (!decoded) return decoded;

  const body = await req.json();
  const { userId: deleteUserId } = body;

  if (!deleteUserId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (decoded.role !== "Admin" && decoded.userId !== deleteUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const deletedUser = await User.findByIdAndDelete(deleteUserId);

  if (!deletedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}
