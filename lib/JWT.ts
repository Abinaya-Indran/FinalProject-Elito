// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET!;

// // Generate JWT Token
// export const generateToken = (role: "buyer" | "seller" | "admin") => {
//   return jwt.sign({ role }, SECRET, { expiresIn: "1h" });
// };

// // Verify JWT Token
// export const verifyToken = (token: string) => {
//   try {
//     return jwt.verify(token, SECRET) as { role: string };
//   } catch (error) {
//     return null;
//   }
// };
