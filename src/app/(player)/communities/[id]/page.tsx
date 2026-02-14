import { communityService } from "@/services/community-service";
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

  // const community = await communityService.getAllPublic();

  // console.log(community);
  return <div>page</div>;
};

export default page;
