import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/user";

// ✅ Handle GET request - Fetch user details by ID
export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(id).select("-password"); // Exclude password
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch user.", error: error.message },
      { status: 500 }
    );
  }
};

// ✅ Handle PATCH request - Update user details
export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { _id, name, email, password, role, address, phoneNumber, cakeShopName, sellerType } = body;

    if (!_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updates: Record<string, any> = {}
    if (name) updates.name = name
    if (email) updates.email = email
    if (password) updates.password = password
    if (role) updates.role = role
    if (address) updates.address = address
    if (phoneNumber) updates.phoneNumber = phoneNumber
    if (cakeShopName) updates.cakeShopName = cakeShopName
    if (sellerType) updates.sellerType = sellerType

    const updatedUser = await User.findByIdAndUpdate(
      { _id: _id },
      { $set: updates },
      { new: true }
    )
    console.log('Abinaya', body, _id)
    console.log('Updated User Data', updatedUser)
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch user.", error: error.message },
      { status: 500 }
    );
  }
};

// ✅ Handle DELETE request - Remove user
export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    console.log("ID:", id);

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully", deletedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    return NextResponse.json(
      { message: "Failed to delete user.", error: error.message },
      { status: 500 }
    );
  }
};
