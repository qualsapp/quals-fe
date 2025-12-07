import { ApiUrl, TokenExpirationDays } from "@/lib/env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This route acts as a middleware between you and your backend server
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const payload = await request.json();

  try {
    // register request to the original backend
    const res = await fetch(ApiUrl + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (res.ok) {
      cookieStore.set("token", json.token, {
        path: "/",
        expires: new Date(
          json?.token_expires_at ||
            Date.now() + Number(TokenExpirationDays) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    // Return the same response as the external backend.
    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.log("Error logging in:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
