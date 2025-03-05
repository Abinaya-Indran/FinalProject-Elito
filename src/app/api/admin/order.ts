import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/db'; // Correct import
import Order from '../../../../models/order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ensure a connection to the database is established
    await connectToDatabase();

    const { method } = req;

    switch (method) {
      case 'GET': {
        // Fetch all orders
        try {
          const orders = await Order.find();
          res.status(200).json({ success: true, data: orders });
        } catch (error) {
          res.status(400).json({ success: false, message: (error as Error).message });
        }
        break;
      }
      case 'POST': {
        // Create a new order
        try {
          const order = await Order.create(req.body);
          res.status(201).json({ success: true, data: order });
        } catch (error) {
          res.status(400).json({ success: false, message: (error as Error).message });
        }
        break;
      }
      case 'PUT': {
        // Update an order
        const { id } = req.query;
        try {
          const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
          if (!order) throw new Error('Order not found');
          res.status(200).json({ success: true, data: order });
        } catch (error) {
          res.status(404).json({ success: false, message: (error as Error).message });
        }
        break;
      }
      case 'DELETE': {
        // Delete an order
        const { id } = req.query;
        try {
          const order = await Order.findByIdAndDelete(id);
          if (!order) throw new Error('Order not found');
          res.status(200).json({ success: true, data: order });
        } catch (error) {
          res.status(404).json({ success: false, message: (error as Error).message });
        }
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (connectionError) {
    // Catch database connection errors
    res.status(500).json({ success: false, message: 'Database connection failed', error: (connectionError as Error).message });
  }
}
