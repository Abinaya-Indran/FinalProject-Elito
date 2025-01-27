import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    cakeId: { type: String, required: true },
    sellerId: { type: String, required: true },
    buyerDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      whatsappNumber: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String, required: true },
    },
    deliveryDetails: {
      deliveryCity: { type: String, required: true },
      deliveryArea: { type: String, required: true },
      deliveryDate: { type: String, required: true },
      deliveryTime: { type: String, required: true },
    },
    status: { type: String, enum: ["pending", "accepted", "denied"], default: "pending" },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
