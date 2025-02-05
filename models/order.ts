import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  cakeId: string;
  sellerId: string;
  buyerId: string;
  status: "pending" | "accepted" | "denied";
  buyerDetails: {
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    address: string;
    email: string;
  };
  deliveryDetails: {
    deliveryCity: string;
    deliveryArea?: string;
    deliveryDate: string;
  };
}

const OrderSchema = new Schema<IOrder>(
  {
    cakeId: { type: String, required: true },
    buyerId: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "denied"], default: "pending" },
    buyerDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: false, default: "" },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String, required: true },
    },
    deliveryDetails: {
      deliveryCity: { type: String, required: true },
      deliveryArea: { type: String, required: false, default: "" },
      deliveryDate: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
