import { connectToDatabase } from '../../../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '../../../../../lib/auth'; // Adjust the import path as necessary
import User from '../../../../../models/user'; // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
