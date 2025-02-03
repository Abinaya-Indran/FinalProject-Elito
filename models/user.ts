import mongoose, { Schema, Document } from 'mongoose';

// Define the possible roles
type Role = 'Buyer' | 'Seller' | 'Admin';
type SellerType = 'Individual' | 'Cake Shop';

// User schema interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  address?: string;
  phoneNumber?: string;
  cakeShopName?: string;
  sellerType: SellerType;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['Buyer', 'Seller', 'Admin'], required: true },
    address: { type: String, required: function (this: IUser) { return this.role === 'Seller'; } },
    phoneNumber: { type: String, required: function (this: IUser) { return this.role === 'Seller'; } },
    cakeShopName: { type: String, required: function (this: IUser) { return this.role === 'Seller' && this.sellerType === 'Cake Shop'; } },
    sellerType: { type: String, enum: ['Individual', 'Cake Shop'], required: function (this: IUser) { return this.role === 'Seller'; } },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
