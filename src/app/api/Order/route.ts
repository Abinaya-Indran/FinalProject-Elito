import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Order from "../../../../models/Order";

// GET: Fetch all orders
export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find();
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
    });
  }
}

// POST: Create a new order
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Validation
    if (!body.productName || !body.quantity || !body.totalPrice) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const newOrder = new Order(body);
    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Failed to create order" }), {
      status: 500,
    });
  }
}

// PATCH: Update an order by ID
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { orderId, productName, quantity, totalPrice } = body;

    // Validate input
    if (!orderId || (!productName && !quantity && !totalPrice)) {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { productName, quantity, totalPrice },
      { new: true }
    );

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: "Failed to update order" }), {
      status: 500,
    });
  }
}

// DELETE: Delete an order by ID
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: "Order ID is required" }),
        { status: 400 }
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Failed to delete order", details: error.message }),
      { status: 500 }
    );
  }
}
