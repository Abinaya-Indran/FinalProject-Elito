// app/api/user/logout.ts
import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
  response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
  return response;
}
