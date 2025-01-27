import mongoose, { Document, Schema, Model } from "mongoose";

export interface IImage extends Document {
  name: string;
  url: string; // Cloudinary URL
  public_id: string; // Cloudinary public ID for deletion
}

const imageSchema = new Schema<IImage>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { timestamps: true }
);

export const Image: Model<IImage> =
  mongoose.models.Image || mongoose.model<IImage>("Image", imageSchema);
