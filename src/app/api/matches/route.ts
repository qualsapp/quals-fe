import { ApiUrl } from "@/lib/env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const body = await request.json();

  try {
    const res = await fetch(
      ApiUrl +
        `/communities/${body.community_id}/events/${body.event_id}/tournaments/${body.tournament_id}/matches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body.params),
      },
    );

    const json = await res.json();

    // Return the same response as the external backend.
    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.log("Error updating participant:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
