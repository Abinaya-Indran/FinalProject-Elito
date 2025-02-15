import mongoose, { Schema, Document } from "mongoose";

interface IRating extends Document {
  cakeId: string;
  rating: number;
  review: string;
  createdAt: Date;
}

const RatingSchema = new Schema<IRating>(
  {
    cakeId: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Rating || mongoose.model<IRating>("Rating", RatingSchema);
