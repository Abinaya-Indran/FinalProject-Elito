// src/pages/api/notifications.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Notification from "../../../../models/notification";
import { connectToDatabase } from "../../../../lib/db"; // Assuming you have a db connection utility

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    // Fetch notifications for a seller
    const { sellerId } = req.query;
    try {
      const notifications = await Notification.find({ sellerId }).sort({ timestamp: -1 });
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ error: "Error fetching notifications" });
    }
  } else if (req.method === "POST") {
    // Send a new notification
    const { sellerId, message } = req.body;
    try {
      const notification = new Notification({ sellerId, message });
      await notification.save();
      res.status(201).json({ success: true, notification });
    } catch (error) {
      res.status(500).json({ error: "Error creating notification" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
