import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../../../../../models/user';
import { connectToDatabase } from '../../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) return res.status(404).json({ error: 'User not found' });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: 'Unauthorized' });

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const { name, email, address, phoneNumber, cakeShopName, sellerType } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        decoded.userId,
        { name, email, address, phoneNumber, cakeShopName, sellerType },
        { new: true }
      ).select('-password');

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
