import { ApiUrl } from "@/lib/env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(
  _: Request,
  { params }: { params: { communityId: string } },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { communityId } = params;

  try {
    const res = await fetch(ApiUrl + `/communities/${communityId}`, {
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
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const payload = await request.formData();

  try {
    const res = await fetch(ApiUrl + "/communities", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });
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

export async function PUT(
  request: Request,
  { params }: { params: { communityId: string } },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const payload = await request.formData();
  const { communityId } = params;

  try {
    const res = await fetch(ApiUrl + `/communities/${communityId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });
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
