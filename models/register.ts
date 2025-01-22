// // pages/api/signup.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import User from '../models/user';
// import { connectToDatabase } from '../lib/db';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { fullName, email, password, role } = req.body;

//     // Input validation
//     if (!fullName || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required.' });
//     }

//     try {
//       // Connect to the database
//       await connectToDatabase();

//       // Check if user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: 'User already exists.' });
//       }

//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 12);

//       // Create a new user
//       const newUser = new User({
//         fullName,
//         email,
//         password: hashedPassword,
//         role,
//       });

//       await newUser.save();
//       return res.status(201).json({ message: 'User created successfully!' });
//     } catch (error) {
//       return res.status(500).json({ error: 'Server error' });
//     }
//   } else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// };

// export default handler;
