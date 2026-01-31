import { ApiUrl } from "@/lib/env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { community_id, event_id, ...rest } = await request.json();

  try {
    const res = await fetch(
      ApiUrl + `/communities/${community_id}/events/${event_id}/tournaments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rest),
      },
    );
    const json = await res.json();

    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.log("Error logging in:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
