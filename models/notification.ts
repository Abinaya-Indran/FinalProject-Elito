import mongoose, { Schema, Document, Model } from 'mongoose';

interface INotification extends Document {
  message: string;
  orderId?: string;
  type: 'Order' | 'System';
  isRead: boolean;
}

const NotificationSchema: Schema<INotification> = new Schema(
  {
    message: { type: String, required: true },
    orderId: { type: String },
    type: { type: String, enum: ['Order', 'System'], default: 'System' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
