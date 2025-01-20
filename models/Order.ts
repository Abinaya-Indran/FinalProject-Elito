import mongoose, { Schema, Document, model } from "mongoose";

// Define the TypeScript interface for the Order model
export interface IOrder extends Document {
  productName: string;
  quantity: number;
  totalPrice: number;
  orderDate?: Date; // Optional because it defaults to Date.now
}

// Define the Mongoose schema
const orderSchema: Schema<IOrder> = new Schema({
  productName: { type: String, required: true }, // Name of the product
  quantity: { type: Number, required: true },   // Quantity of the product ordered
  totalPrice: { type: Number, required: true }, // Total price of the order
  orderDate: { type: Date, default: Date.now }, // Default to the current date
});

// Create and export the Mongoose model
const Order = model<IOrder>("Order", orderSchema);

export default Order;
