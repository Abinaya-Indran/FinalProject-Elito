import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { productName, productPrice, productImage, deliveryPrice } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: productName,
              images: [productImage],
            },
            unit_amount: productPrice * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: "Delivery Fee",
              images: [],
            },
            unit_amount: deliveryPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
