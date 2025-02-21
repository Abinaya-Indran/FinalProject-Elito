import mongoose, { Schema, Document } from "mongoose";

const OrderSchema = new Schema(
  {
    cakeId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
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

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
