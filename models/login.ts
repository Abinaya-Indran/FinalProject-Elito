// // pages/api/login.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/user';
// import { connectToDatabase } from '../lib/db';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     // Input validation
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required.' });
//     }

//     try {
//       // Connect to the database
//       await connectToDatabase();

//       // Find user by email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ error: 'Invalid credentials' });
//       }

//       // Check if password is correct
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(400).json({ error: 'Invalid credentials' });
//       }

//       // Create JWT token
//       const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, {
//         expiresIn: '1h',
//       });

//       return res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//       return res.status(500).json({ error: 'Server error' });
//     }
//   } else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// };

// export default handler;
