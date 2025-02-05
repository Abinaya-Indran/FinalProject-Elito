import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Order from "../../../../../models/order";

// ✅ Get Single Order (GET)
export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
    await connectToDatabase();

    try {
        const {orderId} = params;
        console.log(orderId)

        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Update Order (PUT)
export async function PUT(req: NextRequest, { params }: { params: { orderId: string } }) {
    await connectToDatabase();

    try {
        const { orderId } = params;
        const body = await req.json();
        const { status, buyerDetails, deliveryDetails } = body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status, buyerDetails, deliveryDetails },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order updated successfully", order: updatedOrder }, { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Delete Order (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { orderId: string } }) {
    await connectToDatabase();

    try {
        const { orderId } = params;

        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
