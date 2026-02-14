import { ApiUrl } from "@/lib/env";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const authHeader = request.headers.get("Authorization") || "";

  try {
    let body: any;

    if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else {
      body = await request.json();
    }

    const res = await fetch(ApiUrl + "/hosts", {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
      body: contentType.includes("multipart/form-data")
        ? body
        : JSON.stringify(body),
    });
    const json = await res.json();

    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.log("Error in /api/hosts proxy:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(ApiUrl + "/hosts/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
