import { getCommunities } from "@/actions/community";
import CommunityList from "@/components/community/community-list";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const { communities } = await getCommunities();

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
