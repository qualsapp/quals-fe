import { ApiUrl } from "@/lib/env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(ApiUrl + `/sports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    return NextResponse.json(json, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
