// import mongoose, { Schema, Document } from 'mongoose';

// interface Cake extends Document {
//   name: string;
//   price: number;
//   image: string;
//   description?: string;
//   createdAt?: Date;
// }

// const CakeSchema: Schema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       default: '',
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true } // Automatically adds createdAt and updatedAt fields
// );

// const CakeModel = mongoose.models.Cake || mongoose.model<Cake>('Cake', CakeSchema);

// export default CakeModel;
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },  // Now required
  createdAt: { type: Date, required: true },     // Now required
  stock: { type: Number, required: false },    // Now required
  
});
export default mongoose.models.Product || mongoose.model('Product', productSchema);