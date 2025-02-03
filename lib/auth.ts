import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Change this in production

export const generateToken = (user: { id: string; role: string }) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
