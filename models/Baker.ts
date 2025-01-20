import mongoose, { Schema, Document } from 'mongoose';

export interface IBaker extends Document {
  name: string;
  address: string;
  phoneNumber: string;
  role: string; // Individual or Cake Shop
}

const BakerSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ['Individual', 'Cake Shop'], required: true },
});

export const Baker = mongoose.model<IBaker>('Baker', BakerSchema);
