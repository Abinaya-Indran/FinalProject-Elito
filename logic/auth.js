import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "@/lib/config";

interface TokenPayload {
  id: string;
  username: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
