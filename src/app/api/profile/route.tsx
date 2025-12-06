import { ApiUrl } from "@/lib/env";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  try {
    // get the user profile from the external backend with the token
    const res = await fetch(ApiUrl + "/auth/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await res.json();
    // return the user, and token to the client to set them in state
    return NextResponse.json({ user: data, token }, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
