import { ApiUrl } from "@/lib/env";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request: Request) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;
//   const formData = await request.formData();

//   try {
//     const res = await fetch(ApiUrl + "/players", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });
//     const json = await res.json();

//     // Return the same response as the external backend.
//     return NextResponse.json(json, { status: res.status });
//   } catch (err) {
//     console.log("Error logging in:", err);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 },
//     );
//   }
// }

export async function GET(_: Request) {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  try {
    // get the user profile from the external backend with the token
    console.log(`${ApiUrl}/players/detail`);
    // const res = await fetch(ApiUrl + "/players/detail", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // console.log(res);

    // const { data } = await res.json();
    // return the user, and token to the client to set them in state
    // return NextResponse.json({ user: data, token }, { status: res.status });
    return NextResponse.json({ data: "" });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
