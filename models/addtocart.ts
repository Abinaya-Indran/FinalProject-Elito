import mongoose, { Schema, Document } from "mongoose";

interface ICart extends Document {
  userId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 }, // Default quantity is 1
});

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
