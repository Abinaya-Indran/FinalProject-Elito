
import mongoose, { Schema } from 'mongoose';
const productSchema = new mongoose.Schema({
  sellerId: { type: Schema.Types.ObjectId, fer: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
  category: { type:String, required: true },
  
});
export default mongoose.models.Product || mongoose.model('Product', productSchema);