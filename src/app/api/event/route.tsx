import { ApiUrl } from "@/lib/env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { communityId: string } }
) {
  const { communityId } = params;

  try {
    const res = await fetch(ApiUrl + `/communities/${communityId}/events`, {
      headers: {
        "Content-Type": "application/json",
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

export async function POST(
  request: Request,
  { params }: { params: { communityId: string } }
) {
  const { communityId } = params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const payload = await request.json();

  try {
    const res = await fetch(ApiUrl + `/communities/${communityId}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const json = await res.json();

    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.log("Error logging in:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { communityId: string; eventId: string } }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const payload = await request.json();
  const { communityId, eventId } = params;

  try {
    const res = await fetch(
      ApiUrl + `/communities/${communityId}/events/${eventId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const json = await res.json();

    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.log("Error logging in:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
