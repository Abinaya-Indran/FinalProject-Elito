import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Order from "../../../../models/order";

// ✅ Create Order (POST)
export async function POST(req: NextRequest) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { cakeId, buyerId, buyerDetails, deliveryDetails } = body;

        if (!cakeId || !buyerId || !buyerDetails.firstName || !buyerDetails.phoneNumber || !buyerDetails.address || !buyerDetails.email || !deliveryDetails.deliveryCity || !deliveryDetails.deliveryDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newOrder = new Order({
            cakeId,
            buyerId,
            status: "pending",
            buyerDetails: {
              firstName: buyerDetails.firstName,
              lastName: buyerDetails.lastName,
              phoneNumber: buyerDetails.phoneNumber,
              address: buyerDetails.address,
              email: buyerDetails.email,
            },
            deliveryDetails: {
              deliveryCity: deliveryDetails.deliveryCity,
              deliveryArea: deliveryDetails.deliveryArea,
              deliveryDate: deliveryDetails.deliveryDate,
              
            }
        });

        console.log(newOrder)

        await newOrder.save();
        return NextResponse.json({ message: "Order created successfully", order: newOrder }, { status: 201 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Get Orders (GET)
export async function GET(req: NextRequest) {
    await connectToDatabase();

    try {
        const { searchParams } = req.nextUrl;
        const orderId = searchParams.get("orderId");

        if (orderId) {
            // Get a single order
            const order = await Order.findById(orderId);
            if (!order) {
                return NextResponse.json({ error: "Order not found" }, { status: 404 });
            }
            return NextResponse.json(order, { status: 200 });
        } else {
            // Get all orders
            const orders = await Order.find({});
            return NextResponse.json(orders, { status: 200 });
        }
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Update Order (PUT)
export async function PUT(req: NextRequest) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { orderId, ...updateFields } = body; // ✅ Allow partial updates

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            updateFields,  // ✅ Update only fields provided
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order updated successfully", order: updatedOrder }, { status: 200 });
    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Delete Order (DELETE)
export async function DELETE(req: NextRequest) {
    await connectToDatabase();

    try {
        const { searchParams } = req.nextUrl;
        const orderId = searchParams.get("orderId");

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
