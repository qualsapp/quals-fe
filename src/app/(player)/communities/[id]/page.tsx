import { cookies } from "next/headers";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async (props: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { params } = await props;
  const { id } = await params;

  return <div>page</div>;
};

export default page;
