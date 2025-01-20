import mongoose, { Schema, Document, model, models } from 'mongoose';

// Define the Payment interface
export interface IPayment extends Document {
  paymentId: string;
  userId: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
}

// Define the Payment schema
const PaymentSchema: Schema = new Schema<IPayment>({
  paymentId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Safely check and register the model
const Payment = models.Payment || model<IPayment>('Payment', PaymentSchema);

export default Payment;
