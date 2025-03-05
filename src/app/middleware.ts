// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface decodedToken {
  role: string;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as decodedToken;
    req.headers.set("x-user-role", decoded.role);
    return NextResponse.next();
  } catch (error) {
    console.error("Failed to authenticate token:", (error as Error).message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/product", "/sellerpage", "/admin/dashboard"],
};
