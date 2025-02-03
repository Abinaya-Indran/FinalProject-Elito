import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

// Generate JWT Token
export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, SECRET, { expiresIn: "1d" });
};

// Verify JWT Token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET) as { userId: string; role: string };
  } catch (error) {
    return null;
  }
};
