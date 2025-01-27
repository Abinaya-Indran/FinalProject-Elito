import mongoose, { Schema, Document } from "mongoose";

interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const contactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
