import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/db';
import Notification from '../../../../models/notification';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the database
    await connectToDatabase();

    const { method } = req;

    switch (method) {
      case 'GET': {
        // Fetch all unread notifications
        try {
          const notifications = await Notification.find({ isRead: false });
          res.status(200).json({ success: true, data: notifications });
        } catch (error: any) {
          res.status(500).json({ success: false, message: error.message });
        }
        break;
      }

      case 'POST': {
        // Create a new notification
        try {
          const notification = await Notification.create(req.body);
          res.status(201).json({ success: true, data: notification });
        } catch (error: any) {
          res.status(400).json({ success: false, message: error.message });
        }
        break;
      }

      default:
        // Handle unsupported methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (connectionError: any) {
    // Handle database connection errors
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: connectionError.message,
    });
  }
}
