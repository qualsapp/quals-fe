import CommunityCard from "@/components/commons/community-card";
import CommunityList from "@/components/community/community-list";
import { communityService } from "@/services/community-service";
import { userServices } from "@/services/user-services";
import { CommunityListResponse } from "@/types/community";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { communities } = token
    ? await communityService.getAll(token)
    : ({} as CommunityListResponse);

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container space-y-6">
        <h2 className="text-2xl font-bold">Quals Communities</h2>

        <CommunityList communities={communities} />
      </div>
    </div>
  );
};

export default page;
