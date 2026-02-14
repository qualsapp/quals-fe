export const runtime = "edge";
import React from "react";

import CommunityDetailsForm from "@/components/forms/CommunityDetailsForm";
import Heading from "@/components/commons/heading";
import { getSports } from "@/actions/sport";
import { getCommunity } from "@/actions/community";
import { getHostProfile } from "@/actions/host";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const host = await getHostProfile();

  if (!host.community) {
    redirect("/community/create");
  }

  const community = await getCommunity(host.community.id);

  if (!community) {
    return (
      <div className="container lg:py-16 py-8 space-y-10">
        <p>Community not found</p>
      </div>
    );
  }

  const sports = await getSports();

  if (!sports) {
    redirect("/community/create");
  }

  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <Heading
        title="Edit Community Details"
        description="Update the information about your community"
      />

      <div className="w-full sm:w-2/3 mx-auto ">
        <CommunityDetailsForm
          community={community}
          sports={sports.sport_types}
        />
      </div>
    </div>
  );
};

export default page;
