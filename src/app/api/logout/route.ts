import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This route acts as a middleware between you and your backend server
export async function POST(request: Request) {
  const cookie = await cookies();

  cookie.delete("token");

  return NextResponse.json({ success: true });
}
