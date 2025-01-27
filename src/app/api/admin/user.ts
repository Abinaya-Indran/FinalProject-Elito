import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../lib/db';
import User from '../../../../models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the database
    await connectToDatabase();

    const { method } = req;

    switch (method) {
      case 'GET': {
        // Fetch users based on role (buyer or seller)
        const { role } = req.query;

        if (!role) {
          return res.status(400).json({
            success: false,
            message: "Please specify a user role ('buyer' or 'seller') in the query.",
          });
        }

        try {
          const users = await User.find({ role });
          res.status(200).json({ success: true, data: users });
        } catch (error: any) {
          res.status(500).json({ success: false, message: error.message });
        }
        break;
      }

      default:
        // Handle unsupported methods
        res.setHeader('Allow', ['GET']);
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
