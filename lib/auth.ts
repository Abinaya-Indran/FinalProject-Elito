import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Generate JWT
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
}

// Verify JWT
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
