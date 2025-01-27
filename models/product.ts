import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  imageUrl: { type: String, required: true }, // Store Cloudinary image URL
  createdAt: { type: Date, default: Date.now },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
